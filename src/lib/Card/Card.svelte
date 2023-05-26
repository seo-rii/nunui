<script lang="ts">
    import Ripple from "$lib/Ripple";

    export let outlined, secondary = false, primary = false, style = '', flat = false, ripple = false;
</script>

<main class:primary class:secondary class:outlined class:flat
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll {style}>
    <slot/>
    {#if ripple}
        <Ripple/>
    {/if}
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    margin: 6px 0;
    padding: 12px;
    position: relative;
    overflow: hidden;
    @include shadow(medium);
    @include round;
    @include applyTheme(background, '', '', 3);

    &.outlined {
      border: var(--on-surface-light3) 1px solid;
      @include applyTheme(border, 1px solid);
      padding: 9px;
      box-shadow: none;
    }

    &.flat {
      box-shadow: none;
    }
  }
</style>
