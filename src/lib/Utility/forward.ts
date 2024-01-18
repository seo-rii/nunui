import type {SvelteComponent} from 'svelte';
import {get_current_component} from 'svelte/internal';

interface Modifiers {
    passive?: boolean;
    nonpassive?: boolean;
    capture?: boolean;
    once?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    self?: boolean;
    trusted?: boolean;
}

type EventCallback = (event: Event) => void;
type EventDestructor = () => void;

export default function forward() {
    const component = get_current_component();
    let $on: (eventType: string, callback: EventCallback) => EventDestructor;
    const events: [string, EventCallback][] = [];

    component.$on = (fullEventType: string, callback: EventCallback): EventDestructor => {
        let destructor = () => {
        };
        if ($on) {
            destructor = $on(fullEventType, callback);
        } else {
            events.push([fullEventType, callback]);
        }
        return destructor;
    };

    function bubble(e: Event) {
        const callbacks = component.$$.callbacks[e.type] as EventCallback[];
        if (callbacks) {
            callbacks.slice().forEach((fn: EventCallback) => fn.call(component, e));
        }
    }

    return (node: HTMLElement | SVGElement) => {
        const destructors: EventDestructor[] = [];
        const forwardDestructors: { [k: string]: EventDestructor } = {};

        $on = (fullEventType, callback) => {
            const {eventType, modifiers} = parseEventModifiers(fullEventType);
            let handler: EventListenerOrEventListenerObject = callback;
            const addEventListenerOptions: AddEventListenerOptions = {};

            if (modifiers.passive) {
                addEventListenerOptions.passive = true;
            }
            if (modifiers.nonpassive) {
                addEventListenerOptions.passive = false;
            }
            if (modifiers.capture) {
                addEventListenerOptions.capture = true;
            }
            if (modifiers.once) {
                addEventListenerOptions.once = true;
            }

            if (modifiers.preventDefault) {
                handler = prevent_default(handler as EventCallback);
            }
            if (modifiers.stopPropagation) {
                handler = stop_propagation(handler as EventCallback);
            }
            if (modifiers.stopImmediatePropagation) {
                handler = stop_immediate_propagation(handler as EventCallback);
            }
            if (modifiers.self) {
                handler = self_event(node, handler as EventCallback);
            }
            if (modifiers.trusted) {
                handler = trusted_event(handler as EventCallback);
            }

            const off = listen(node, eventType, handler, addEventListenerOptions);
            const destructor = () => {
                off();
                const idx = destructors.indexOf(destructor);
                if (idx > -1) {
                    destructors.splice(idx, 1);
                }
            };

            destructors.push(destructor);

            if (!(eventType in forwardDestructors)) {
                forwardDestructors[eventType] = listen(node, eventType, bubble);
            }

            return destructor;
        };

        for (let i = 0; i < events.length; i++) {
            $on(events[i][0], events[i][1]);
        }

        return {
            destroy: () => {
                destructors.forEach((destructor) => destructor());
                Object.values(forwardDestructors).forEach((destructor) => destructor());
            }
        };
    };
}

function parseEventModifiers(fullEventType: string): { eventType: string; modifiers: Modifiers } {
    const parts = fullEventType.split('$');
    const eventType = parts[0];
    const eventModifiers = parts.slice(1);

    const modifiers: Modifiers = eventModifiers.reduce((acc, modifier) => {
        acc[modifier as keyof Modifiers] = true;
        return acc;
    }, {} as Modifiers);

    return {eventType, modifiers};
}

function listen(
    node: Node,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): EventDestructor {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}

function prevent_default(fn: EventCallback): EventCallback {
    return function (this: SvelteComponent, event: Event) {
        event.preventDefault();
        return fn.call(this, event);
    };
}

function stop_propagation(fn: EventCallback): EventCallback {
    return function (this: SvelteComponent, event: Event) {
        event.stopPropagation();
        return fn.call(this, event);
    };
}

function stop_immediate_propagation(fn: EventCallback): EventCallback {
    return function (this: SvelteComponent, event: Event) {
        event.stopImmediatePropagation();
        return fn.call(this, event);
    };
}

function self_event(node: HTMLElement | SVGElement, fn: EventCallback): EventCallback {
    return function (this: SvelteComponent, event: Event) {
        if (event.target !== node) {
            return;
        }
        return fn.call(this, event);
    };
}

function trusted_event(fn: EventCallback): EventCallback {
    return function (this: SvelteComponent, event: Event) {
        if (!event.isTrusted) {
            return;
        }
        return fn.call(this, event);
    };
}
