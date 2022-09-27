<script lang="ts">
  import Ripple from "$lib/Ripple";
  import Blocker from "$lib/Blocker";

  export let style = "", secondary = false, primary = !secondary, small = false, round = false, outlined = false,
    raised = false, tabindex = undefined, disabled = false;

  let clicked = false, hover = false;
</script>

<div class="wrapper button" class:primary class:secondary {tabindex} class:small class:round
     class:active={hover && !disabled} class:clicked={clicked && !disabled} class:outlined class:raised {style}
     on:click on:mousedown on:mouseup on:touchstart on:touchend on:keypress={(e)=>{
			if(e.key==='Enter'){
				e.target.click();
			}
		 }}>
  <div style:--weight={disabled ? 300 : (clicked ? 200 : (hover ? 500 : 300))}>
    <slot />
  </div>
  <Ripple {primary} {secondary} surface={outlined} opacity={disabled ? 0 : undefined} bind:clicked bind:hover />
  <Blocker active={disabled} />
</div>

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
      @include round(100px);
    }

    &.outlined {
      padding: 9px;

      &.small {
        padding: 6px 9px;
      }

      @include applyTheme(color);
      @include applyTheme(border, 1px solid);
    }

    &:not(.outlined) {
      @include applyTheme(background);
    }

    &.raised {
      @include shadow("common", "mini");
    }

    @include applyThemeOn(color);
  }
</style>
