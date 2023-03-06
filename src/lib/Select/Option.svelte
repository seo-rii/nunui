<script lang="ts">
    import {OneLine, TwoLine} from "$lib/List";
    import {getContext} from "svelte";
    import {get} from "svelte/store";
    import Portal from "svelte-portal";

    const hide = getContext("hide");
    const multiple = getContext("multiple");
    const selected: any = getContext("selected");
    const display: any = getContext("display");
    const target: any = getContext("target");

    export let title = '', subtitle = '', icon = '', data: any, override = false;
    let active = false;

    $: _title = title || data.title || JSON.stringify(data);

    $: {
        if ($multiple) {
            active = $selected?.includes?.(data);
        } else {
            active = $selected === data;
        }
    }

    $: {
        if ($multiple) {
            if (!active) {
                display.update((display) => display.filter((item) => item.title !== _title));
            } else if (get(display).filter((item) => item.title === _title).length === 0) {
                display.update((display) => [...display, {title: _title, data}]);
            }
        } else {
            if (active) display.set([{title: _title, data}]);
            else display.update((display) => display.filter((item) => item.title !== _title));
        }
    }

    function select() {
        if ($multiple) {
            if (!get(selected)?.length) selected.set([]);
            if (active) {
                selected.update((selected) => selected.filter((item) => item !== data));
            } else {
                selected.update((selected) => [...selected, data]);
            }
        } else {
            selected.set(data);
            hide();
        }
    }
</script>

<main on:click={select}>
    {#if !override}
        {#if subtitle}
            <TwoLine {title} {subtitle} {icon} {active} on:click/>
        {:else if title}
            <OneLine {title} {icon} {active} on:click/>
        {/if}
    {/if}

    <slot {active}/>
    {#if $target && active}
        <Portal target={$target}>
            {#if $$slots.display}
                <slot name="display" {active}/>
            {:else}
                <slot {active}/>
            {/if}
        </Portal>
    {/if}
</main>
