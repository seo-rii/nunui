<script lang="ts">
    export let outlined, secondary = false, primary = false;
</script>

<main class:primary class:secondary class:outlined
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
    <slot/>
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    margin: 5px;
    padding: 10px;
    position: relative;
    overflow: hidden;
    @include shadow(medium);
    @include round;
    @include applyTheme(background, '', '', 3);

    &.outlined {
      @include applyTheme(border, 1px solid);
      padding: 9px;
      box-shadow: none;
    }
  }
</style>
