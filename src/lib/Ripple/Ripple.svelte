<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let duration = 300, opacity = undefined, center = false, active = false,
		secondary = false, error = false, primary = !secondary && !error, surface = true, additional = null;

	export let clicked = false, hover = false;

	let container: HTMLElement, adapter, lastAdditional;
	let x = 0, y = 0, size = 0, show = false, hide = false, back = false, ts = 0, ig = 0, iig = 0;

	$: clicked = show && !hide;
	$: hover = !clicked && back;
	$: {
		if (additional !== lastAdditional) {
			removeHandler(lastAdditional);
			applyHandler(additional);
			lastAdditional = additional;
		}
	}

	function rippleSize(targetX: number, targetY: number) {
		const rect = container.getBoundingClientRect(), width = rect.width, height = rect.height;
		if (!center) {
			const __x = targetX - rect.left - window.scrollX,
				__y = targetY - rect.top - window.scrollY;
			const _x = Math.max(__x, width - __x), _y = Math.max(__y, height - __y);
			const size = Math.sqrt(_x * _x + _y * _y) * 2;
			const x = __x - size / 2, y = __y - size / 2;
			return { x, y, size };
		} else {
			const size = Math.max(rect.width, rect.height),
				x = rect.width / 2 - size / 2,
				y = rect.height / 2 - size / 2;
			return { x, y, size };
		}
	}

	function rippleShowEvent(targetX, targetY) {
		if (iig) {
			iig--;
			return;
		}
		if (ig) {
			ig--;
			iig++;
		}
		show = hide = false;
		({ x, y, size } = rippleSize(targetX, targetY));
		ts = Date.now();
		new Promise((resolve) => setTimeout(resolve, 50)).then(() => show = true);
	}

	const showRippleMouse = ({ pageX, pageY }) => rippleShowEvent(pageX, pageY),
		showRippleTouch = (e) => {
			ig++;
			back = false;
			rippleShowEvent(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
		};

	const hideRipple = () => new Promise((resolve) => setTimeout(resolve, Math.max(0, duration - (Date.now() - ts)))).then(() => hide = true),
		exitRipple = () => hideRipple().then(() => back = false);

	const showBackground = () => back = true;

	const applyHandler = (el) => {
		if (!el) return;
		el.addEventListener('mousemove', showBackground);
		el.addEventListener('mousedown', showRippleMouse);
		el.addEventListener('mouseup', hideRipple);
		el.addEventListener('mouseleave', exitRipple);
		el.addEventListener('touchstart', showRippleTouch);
		el.addEventListener('touchend', exitRipple);
		el.addEventListener('touchcancel', exitRipple);
	};

	const removeHandler = (el) => {
		if (!el) return;
		el.removeEventListener('mousemove', showBackground);
		el.removeEventListener('mousedown', showRippleMouse);
		el.removeEventListener('mouseup', hideRipple);
		el.removeEventListener('mouseleave', exitRipple);
		el.removeEventListener('touchstart', showRippleTouch);
		el.removeEventListener('touchend', exitRipple);
		el.removeEventListener('touchcancel', exitRipple);
	};

	onMount(() => {
		container = adapter.parentElement;
		container.style.overflow = 'hidden';
		applyHandler(container);
		return () => removeHandler(container);
	});

	const backOp = tweened(0, { duration: 200 });
	let _back = 0, _hide = 0;
	$: {
		if (_back === 1) backOp.set(0.3);
		else if (_back === 0) backOp.set(0);
	}

	$: {
		if (back || active) _back++;
		else setTimeout(() => _back && _back--);
	}

	$: {
		if (hide) setTimeout(() => _hide && _hide--, 200);
		else _hide++;
	}
</script>

<main bind:this={adapter} class:show class:hide style:--rop={opacity}>
	{#if _hide}
        <span class:show class:primary class:secondary class:error class:surface
							style="--x:{x}px;--y:{y}px;--size:{size}px;--dur:{duration}ms;" />
	{/if}
</main>
{#if $backOp}
	<div class:primary class:secondary class:error
			 class:surface style:opacity={$backOp} />
{/if}

<style lang="scss">
  @import "src/lib/Style";

  main {
    @include full;
    @include CShow(var(--rop), 0);

    & {
      pointer-events: none;
      transition: background 0.3s;
    }

    span {
      & {
        @include round(round);
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);
        background: #888888;
        animation-timing-function: cubic-bezier(0, .57, .1, .98) !important;
      }

      @include applyThemeOn(background);

      &.surface {
        @include applyTheme(background);
      }

      &.show {
        @include AScaleIn(var(--dur), 0, forwards);
      }
    }

    &.hide {
      @include AFadeOut(0.2s, var(--rop));
    }
  }

  div {
    @include full;
    background: #888888;

    &.surface {
      @include applyTheme(background);
    }

    &:not(.surface) {
      @include applyThemeOn(background);
    }
  }
</style>
