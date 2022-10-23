<script lang="ts">
    import {getContext, onDestroy} from "svelte";

    const col = getContext("col");

    export let style = '', width = 1;
    let idx = $col.length;

    const upd = () => $col = $col;

    $: {
        $col[idx] = parseInt(<any>width);
        upd();
    }

    onDestroy(() => {
        delete $col[idx];
        upd();
    })
</script>

<!--
<Portal target={$header}>
    <slot/>
</Portal>
-->
<th {style}
    on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove
    on:mouseout on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover
    on:dragstart on:drop on:scroll>
    <slot/>
</th>
