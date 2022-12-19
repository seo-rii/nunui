<script lang="ts">
    import {OneLine, TwoLine} from "$lib/List";
    import {getContext} from "svelte";
    import {get} from "svelte/store";

    const hide = getContext("hide");
    const multiple = getContext("multiple");
    const selected: any = getContext("selected");
    const display = getContext("display");

    export let title = '', subtitle = '', icon = '', data: any;
    let active = false;

    $: _title = title || data.title || JSON.stringify(data);

    $: {
        if ($multiple) {
            active = $selected?.includes?.(data);
        } else {
            active = $selected === data;
        }
    }

    function select() {
        if ($multiple) {
            if (!get(selected)?.length) selected.set([]);
            if (active) {
                selected.update((selected) => selected.filter((item) => item !== data));
                display.update((display) => display.filter((item) => item.title !== _title));
            } else {
                selected.update((selected) => [...selected, data]);
                display.update((display) => [...display, {title: _title, data}]);
            }
        } else {
            selected.set(data);
            display.set([{title: _title, data}]);
            hide();
        }
    }
</script>

<main on:click={select}>
    {#if subtitle}
        <TwoLine {title} {subtitle} {icon} {active} on:click/>
    {:else if title}
        <OneLine {title} {icon} {active} on:click/>
    {/if}

    <slot {active}/>
</main>
