<script lang="ts">
    export let style = '';
</script>

<tr {style}
    on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove
    on:mouseout on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover
    on:dragstart on:drop on:scroll>
    <slot/>
</tr>

<style lang="scss">
  tr {
    &:not(:first-child) {
      transition: background 0.2s ease-in-out;

      &:hover {
        background-color: var(--primary-light2);
      }
    }

    &:nth-child(even) {
      background-color: var(--primary-light1);
    }

    &:nth-child(2) {
      background-color: unset;
    }
  }
</style>
