<script lang="ts">
  import Ripple from "$lib/Ripple";
  import Blocker from "$lib/Blocker";

  export let style = "", secondary = false, primary = !secondary, small = false, round = false, outlined = false,
    raised = false, tabindex = undefined, disabled = false;

  let clicked = false, active = false;
</script>

<style lang="scss">
  @import "src/lib/Style";

  .wrapper {
    @include round;
    display: inline-block;
    position: relative;
    padding: 10px;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;

    &.active {
      @include round(large);
    }

    &.clicked {
      @include round(20px);
    }

    &.small {
      font-size: 16px;
      line-height: 16px;
      padding: 7px 10px;
      @include round(small);

      &.active {
        @include round;
      }

      &.clicked {
        @include round(large);
      }
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
</style>

<div class="wrapper button" class:primary class:secondary class:surface={outlined} {tabindex} class:small class:round
     class:active={active && !disabled} class:clicked={clicked && !disabled} class:outlined class:raised {style}
     on:click on:mousedown on:mouseup on:touchstart on:touchend on:keypress={(e)=>{
			if(e.key==='Enter'){
				e.target.click();
			}
		 }}>
  <div style:--weight={(active && !clicked) ? 500 : 300}>
    <slot />
  </div>
  <Ripple {primary} surface={!outlined} opacity={disabled?0:undefined} bind:clicked bind:active />
  <Blocker active={disabled} />
</div>
