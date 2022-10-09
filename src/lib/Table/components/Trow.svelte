<script lang="ts">
    export let style = '';
</script>

<tr {style}
    on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove
    on:mouseout on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover
    on:dragstart on:drop on:scroll>
    <slot/>
</tr>
