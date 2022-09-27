<script lang="ts">
  import Ripple from "$lib/Ripple";
  import { tweened } from "svelte/motion";

  export let style = "", secondary = false, primary = !secondary, small = false, round = false, outlined = false,
    raised = false, tabindex = undefined, disabled = false;

  let clicked = false, active = false, weight = tweened(500, { duration: 100 });

  $: $weight = (active && !clicked) ? 500 : 300;
</script>

<style lang="scss">
  @import "src/lib/Style";

  .wrapper {
    @include round;
    display: inline-block;
    padding: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    user-select: none;
    position: relative;
    font-size: 20px;
    line-height: 20px;

    &.small {
      font-size: 16px;
      line-height: 16px;
      padding: 7px 10px;
    }

    &.round {
      @include round(round);
    }

    &.outlined {
      border: 1px solid #dfdfdf;
    }

    &.raised {
      @include shadow("common", "mini");
    }

    @include applyTheme(background);
    @include applyThemeOn(color);
  }

  .blocker {
    @include full;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: initial;
      cursor: not-allowed;
      z-index: 1;
    }
  }
</style>

<div class="wrapper button" class:primary class:secondary class:surface={outlined} class:small class:round
     class:outlined {style} on:click on:mousedown on:mouseup on:touchstart on:touchend class:raised {tabindex}
     on:keypress={(e)=>{
			if(e.key==='Enter'){
				e.target.click();
			}
		 }}>
  <div style:--weight={$weight}>
    <slot />
  </div>
  <Ripple {primary} surface={!outlined} opacity={disabled?0:undefined} bind:clicked bind:active />
  <div class="blocker" class:active={disabled}></div>
</div>
