<script lang="ts">
	import Ripple from '$lib/Ripple';
	import forward from '$lib/Utility/forward';

	const ev = forward();
	export let outlined, secondary = false, primary = false, style = '', flat = false, ripple = false, active = false,
		clicked;
</script>

<main class:primary class:secondary class:outlined class:flat class:ripple use:ev {style}>
	<slot />
	{#if ripple}
		<Ripple {active} bind:clicked />
	{/if}
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    & {
      margin: 6px 0;
      padding: 12px;
      position: relative;
      overflow: hidden;
      @include shadow(medium);
      @include round;
      @include applyTheme(background, '', '', 3);
    }

    &.outlined {
      @include applyTheme(border, 1px solid);

      & {
        border: var(--on-surface-light3) 1px solid;
        padding: 9px;
        box-shadow: none;
      }
    }

    &.flat {
      box-shadow: none;
    }

    &.ripple {
      cursor: pointer;
    }
  }
</style>
