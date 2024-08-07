<script context='module' lang="ts">
	import { wheelEvent, wheelOpt } from '$lib/Utility/scroll.js';

	declare const window;
	const closeFunc = new Set();
	let globalLock = false, lockLevel = 0;

	export function closeAll(lv) {
		closeFunc.forEach(func => func(lv));
	}

	function preventDefault(e) {
		e.preventDefault();
	}

	function preventDefaultForScrollKeys(e) {
		if (e.keyCode > 36 && e.keyCode < 41) e.preventDefault();
	}

	function disableScroll() {
		window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.addEventListener(wheelEvent, preventDefault, wheelOpt);
		window.addEventListener('touchmove', preventDefault, wheelOpt);
		window.addEventListener('keydown', preventDefaultForScrollKeys, false);
	}

	function enableScroll() {
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.removeEventListener(wheelEvent, preventDefault, <any>wheelOpt);
		window.removeEventListener('touchmove', preventDefault, <any>wheelOpt);
		window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
	}

	function lockScroll() {
		if (!lockLevel) disableScroll();
		lockLevel++;
	}

	function unlockScroll() {
		lockLevel--;
		if (!lockLevel) enableScroll();
	}
</script>

<script lang='ts'>
	import { onMount, tick } from 'svelte';
	import { tweened } from 'svelte/motion';
	import Hoverable from '$lib/Hoverable';
	import Icon from '$lib/Icon';
	import { browser } from '$app/environment';

	const mobileAnim = tweened(0, { duration: 200 });

	export let left = !$$props.right, center = false, right = false, top = !$$props.bottom, middle = false,
		bottom = false, __remap = false,
		unbounded = false, absolutex = false, absolutey = false, tooltip = false, exOpen = false, hover = false;
	export let xstack = false, ystack = false;
	export let stacked = 0;
	export let style = '', title = '', icon = '';
	export let fullWidth = false;
	export let width = '240px;';
	export let padding = 0;
	export let mobile = false;
	export let marginTop = 0;
	export let inline = false, block = false;
	export let forceRender = false;

	export let open = false, show = () => setTimeout(() => open = true, 0), hide = (lv = stacked) => {
		if (lv <= stacked) open = exOpen = false;
	};
	let target, paper, lock = false, scrim, clientWidth;
	let _left = 0, _top = 0, _height = 0;
	let render = false, _render = false;
	let touchY = 0, paperY = 0, _open = open;
	let hovering;
	let scroll = false;
	let diffX, diffY;
	let maxHeight = 0;
	let touching = false;

	$: if (hover && (exOpen || !exOpen) && !hovering) open = false;

	$: if (lock && stacked) {
		globalLock = true;
		setTimeout(() => globalLock = false, 100);
	}

	function fixTop(__top, paperBounding) {
		if (__top < marginTop) {
			_height = __top + paperBounding.height - marginTop;
			__top = marginTop + diffY;
			scroll = true;
		}
		return __top;
	}

	function updatePosition() {
		if (!paper) return;
		const paperBounding = paper.getBoundingClientRect();
		const targetBounding = target.children?.[0] ? target.children[0].getBoundingClientRect() : target.getBoundingClientRect();
		let __left, __top;

		if (unbounded) {
			__left = absolutex;
			__top = absolutey;
		} else {
			if (left) {
				if (xstack) __left = targetBounding.left;
				else __left = targetBounding.left - paperBounding.width - 10;
			}
			if (right) {
				if (xstack) __left = targetBounding.right - paperBounding.width;
				else __left = targetBounding.right + 10;
			}
			if (top) {
				if (ystack) __top = targetBounding.top;
				else {
					__top = targetBounding.top - paperBounding.height - 10;
					__top = fixTop(__top, paperBounding);
				}
			}
			if (bottom) {
				if (ystack) {
					__top = targetBounding.bottom - paperBounding.height + 10;
					__top = fixTop(__top, paperBounding);
				} else __top = targetBounding.bottom;
			}
		}

		__left -= diffX;
		__top -= diffY;

		_left = __left;
		_top = __top;
		maxHeight = window.innerHeight - __top - 12;
	}


	function getDiff() {
		if (!paper) return;
		const paperBounding = paper.getBoundingClientRect();
		diffX = paperBounding.left - _left;
		diffY = paperBounding.top - _top;
	}

	$: if (open || exOpen) {
		if (!tooltip) closeAll(stacked);
		open = true;
		maxHeight = 10000;
		tick().then(() => {
			getDiff();
			_height = 0;
			scroll = false;
			tick().then(updatePosition);
		});
	}

	$: {
		if (open) {
			mobileAnim.set(1000, { duration: 0 });
			setTimeout(() => {
				mobileAnim.set(paper?.offsetHeight || 0, { duration: 0 });
				mobileAnim.set(0);
			}, 10);
		} else mobileAnim.set(paper?.offsetHeight || 0);
	}

	$: _style = mobile ? `left:0;bottom:calc(${paperY}px - ${$mobileAnim}px);width:calc(100% - ${padding}px * 2);padding:${padding}px;`
		: `left:${_left}px;top:${_top}px;width:${width};padding:${padding}px;${_height ? `height:${_height}px;` : ''}${scroll ? `overflow-y:scroll;` : ''}`;

	$: {
		if (open !== _open) {
			_open = open;
			if (!tooltip) {
				if (open) lockScroll();
				else unlockScroll();
			}
			if (open) paperY = 0;
		}
	}

	const outsideClickDetect = () => {
		if (lock) lock = false;
		else setTimeout(() => {
			if (!globalLock) hide(0);
		}, 0);
	};

	function touchStart(e) {
		touchY = e.touches[0].clientY;
		paperY = 0;
		touching = true;
		e.stopPropagation();
	}

	function touchMove(e) {
		paperY -= e.touches[0].clientY - touchY;
		if (paperY > 0) paperY = 0;
		touchY = e.touches[0].clientY;
		e.stopPropagation();
		e.preventDefault();
	}

	function touchEnd(e) {
		if (paperY < -100) hide();
		else paperY = 0;
		touching = false;
		e.stopPropagation();
	}

	$: {
		if (open || exOpen || forceRender) render = true;
		else setTimeout(() => render = false, 200);
		if (open || exOpen) _render = true;
		else setTimeout(() => _render = false, 200);
	}

	const scrollEvent = (e) => {
		e.stopPropagation();
		if (!scroll) e.preventDefault();
		else if (e.wheelDelta < 0) {
			if ((e.currentTarget.scrollHeight - e.currentTarget.scrollTop - _height) <= 0) e.preventDefault();
		} else if (e.currentTarget.scrollTop == 0) e.preventDefault();
	};

	let main, rmp = null;

	onMount(() => {
		closeFunc.add(hide);
		window.addEventListener('click', outsideClickDetect);
		return () => {
			if (open && !tooltip) unlockScroll();
			closeFunc.delete(hide);
			window.removeEventListener('click', outsideClickDetect);
			if (paperMount) {
				main?.removeEventListener?.('touchstart', touchStart);
				main?.removeEventListener?.('touchmove', touchMove);
				main?.removeEventListener?.('touchend', touchEnd);
			}
			if (rmp) {
				rmp.append(paper);
				rmp.append(scrim);
			}
		};
	});

	let paperMount = false;

	$: if (__remap && paper && scrim && browser) {
		if (!rmp) {
			rmp = paper?.parentElement;
			document.getElementById('app').append(paper);
			document.getElementById('app').append(scrim);
		}
	}

	$: if (paper) {
		paperMount = true;
		main.addEventListener('touchstart', touchStart);
		main.addEventListener('touchmove', touchMove);
		main.addEventListener('touchend', touchEnd);
	}
</script>

<main bind:this={main}>
	<div class='target' bind:this={target} on:click={()=>open=!open} on:click={()=>lock=true} {style} class:fullWidth
			 class:noTarget={!$$slots.target} class:inline class:block>
		<slot name='target' />
	</div>
	{#if render}
		<div class='scrim' on:click|stopPropagation={()=>hide(stacked)} class:open={open && mobile}
				 bind:this={scrim}></div>
		<div class='paper' bind:this={paper} class:open={open || exOpen} style={_style} bind:clientWidth
				 class:render={_render} on:click={() => lock = true} class:left class:center class:right class:top
				 class:middle class:bottom class:xstack class:ystack class:nxstack={!xstack} class:nystack={!ystack}
				 class:desktop={!mobile} class:mobile={mobile} style:max-height="{maxHeight}px" class:touching
				 on:wheel|nonpassive|stopPropagation>
			{#if mobile}
				<div class='dragContainer'>
					<div class='drag'></div>
				</div>
			{/if}
			<Hoverable bind:hovering>
				{#if title}
					{#if mobile}
						<h3 class='title'>
							<Icon {icon} style="margin-right: 10px;" />{title}
						</h3>
					{:else}
						<h4 class='title'>
							<Icon {icon} style="margin-right: 10px;" />{title}
						</h4>
					{/if}
				{/if}
				<slot {open} {show} {hide} />
			</Hoverable>
		</div>
	{/if}
</main>

<style lang='scss'>
  @import 'src/lib/Style';

  .target {
    display: inline-flex;

    &.noTarget {
      display: none;
    }

    &.fullWidth {
      width: 100%;
      display: inline-block;
      position: relative;
    }

    &.inline {
      display: inline-block;
    }

    &.block {
      display: block;
    }
  }

  .paper {
    position: fixed;
    z-index: 9999999;
    @include shadow;
    background: var(--surface);
    opacity: 0;
    pointer-events: none;
    display: none;
    overflow-x: hidden;
    overflow-y: auto;

    &.render {
      display: initial;
    }

    &.mobile {
      border-radius: 12px 12px 0 0;
      width: 100%;
      left: 0;
      bottom: 0;
      transition: bottom 0.15s cubic-bezier(0, .65, .35, 1), opacity 0.15s cubic-bezier(1, 0, 1, 0);

      &.open {
        opacity: 1;
        pointer-events: unset;
        transition: bottom 0.15s cubic-bezier(0, .35, .65, 1), opacity 0.15s cubic-bezier(0, 1, 0, 1);
      }

			&.touching {
				transition: none;
			}
    }

    &.desktop {
      @include round;
      transition: opacity 0.2s cubic-bezier(1, 0, .67, 1), transform 0.2s cubic-bezier(1, 0, .67, 1);
      transform: scale(0.85);

      &.left.top.nxstack.nystack, &.right.top.xstack.nystack, &.left.bottom.nxstack.ystack, &.right.bottom.xstack.ystack {
        transform-origin: right bottom;
      }

      &.right.top.nxstack.nystack, &.left.top.xstack.nystack, &.right.bottom.nxstack.ystack, &.left.bottom.xstack.ystack {
        transform-origin: left bottom;
      }

      &.left.bottom.nxstack.nystack, &.right.bottom.xstack.nystack, &.left.top.nxstack.ystack, &.right.top.xstack.ystack {
        transform-origin: right top;
      }

      &.right.bottom.nxstack.nystack, &.left.bottom.xstack.nystack, &.right.top.nxstack.ystack, &.left.top.xstack.ystack {
        transform-origin: left top;
      }

      &.open {
        animation: open-desktop 0.15s cubic-bezier(0, .75, .25, 1);
        opacity: 1;
        transform: none;
        pointer-events: unset;
      }
    }
  }

  .scrim {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: #00000066;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
    z-index: 9999998;

    &.open {
      opacity: 1;
      pointer-events: unset;
    }
  }

  .dragContainer {
    width: 100%;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    .drag {
      height: 5px;
      width: 60px;
      background: #666;
      @include round;
    }
  }

  main {
    display: contents;
  }

  .title {
    margin: 10px;
    display: flex;
    align-items: center;

    & :global(*) {
      font-weight: 700;
    }
  }

  @keyframes open-desktop {
    0% {
      transform: scale(0.75);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes open-mobile {
    0% {

    }
  }
</style>
