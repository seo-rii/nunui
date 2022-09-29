import {SvelteComponent, bubble, listen, get_current_component} from 'svelte/internal';
import {onMount, onDestroy} from 'svelte';

export default function <T extends SvelteComponent | Element>(node: HTMLElement, additionalEvents: string[] = []) {
    const events = [
        'focus', 'blur',
        'fullscreenchange', 'fullscreenerror', 'scroll',
        'cut', 'copy', 'paste',
        'keydown', 'keypress', 'keyup',
        'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
        'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
        'touchcancel', 'touchend', 'touchmove', 'touchstart',
        'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture',
        ...additionalEvents
    ];
    const component = get_current_component();
    const destructors: (() => void)[] = [];

    function forward(e: Event) {
        bubble(component, e);
    }

    if (node instanceof Element) {
        events.forEach((event) => {
            destructors.push(listen(node, event, forward));
        });
    } else {
        events.forEach((event) => {
            destructors.push(component.$on(event, forward));
        });
    }

    return {
        destroy() {
            while (destructors.length) {
                destructors.pop()?.();
            }
        }
    }
}
