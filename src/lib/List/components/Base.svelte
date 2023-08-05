<script lang="ts">
    import Ripple from "$lib/Ripple";

    export let round = true, active = false;
</script>

<main class:round {...$$restProps}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll on:focus on:blur>
    <slot/>
    <Ripple {active}/>
</main>

<style lang="scss">
  main {
    display: block;
    position: relative;
    cursor: pointer;
    padding: 8px;

    &.round {
      border-radius: 100px;
      margin: 0 1px 1px 1px;
    }
  }
</style>
