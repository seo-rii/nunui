<script lang="ts">
    import Portal from "svelte-portal";
    import {getContext} from "svelte";

    const header = getContext("header");

    export let style = '';
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
