<script lang="ts">
	import forward from '$lib/Utility/forward';

	export let progress = 0, width = '100%', style = '', indeterminate = false, secondary = false, primary = !secondary,
		color = '';

	const ev = forward();
	let _progress, _indeterminate = indeterminate, start = false, stop = false;

	$: {
		if (indeterminate !== _indeterminate) {
			if (!indeterminate) {
				start = true;
				setTimeout(() => {
					start = false;
					_indeterminate = indeterminate;
				}, 200);
			} else {
				stop = true;
				setTimeout(() => {
					stop = false;
					_indeterminate = indeterminate;
				}, 200);
			}
		}
	}

	$: setTimeout(() => _progress = stop ? 1 : (indeterminate ? 0 : (Math.max(0, progress) || 0)), 50);
</script>

<div class="adapter" style={`width: ${width};${style}`} use:ev>
	<div class="container" class:primary class:secondary>
		{#if _indeterminate || indeterminate}
			<div class:exit={start}>
				<div class="indicator ind-1" class:primary class:secondary style:background={color}></div>
				<div class="indicator ind-2" class:primary class:secondary style:background={color}></div>
			</div>
		{/if}
		{#if !_indeterminate || !indeterminate}
			<div class:exit={stop}>
				<div class="indicator" class:primary class:secondary style:background={color}
						 style:width="{_progress * 100 || 0}%"></div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
  @import "src/lib/Style";

  .adapter {
    @include round(50px);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 8px;
  }

  .container {
    @include round(50px);
    @include applyTheme(background-color, '', '', 3);

    & {
      position: absolute;
      top: 3px;
      height: 2px;
      width: 100%;
    }
  }

  .indicator {
    @include applyTheme(background);

    & {
      position: absolute;
      top: -2px;
      left: 0;
      border-radius: 5px;
      transition: all 0.3s ease;
      height: 6px;
    }
  }

  .ind-1 {
    animation: ind-1 3s ease-in infinite;
  }

  .ind-2 {
    animation: ind-2 3s ease-out infinite;
  }

  .exit {
    @include AFadeOut(0.3s);
  }

  @keyframes ind-1 {
    0% {
      left: 0;
      width: 0;
    }

    65% {
      left: 100%;
      width: 150%;
    }

    100% {
      left: 100%;
      width: 0;
    }
  }

  @keyframes ind-2 {
    0% {
      left: -150%;
      width: 150%;
    }

    55% {
      left: -150%;
      width: 150%;
    }

    90% {
      left: 100%;
      width: 9%;
    }

    100% {
      left: 100%;
      width: 9%;
    }
  }
</style>
