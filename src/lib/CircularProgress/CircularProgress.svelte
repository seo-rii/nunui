<script lang="ts">
  export let progress = 0, indeterminate = false, size = 60, secondary = false, primary = !secondary;

  let _progress, _indeterminate = indeterminate, start = false, stop = false;

  $: {
    if (indeterminate !== _indeterminate) {
      if (!indeterminate) {
        start = true;
        setTimeout(() => {
          start = false;
          _indeterminate = indeterminate;
        }, 500);
      } else {
        stop = true;
        setTimeout(() => {
          stop = false;
          _indeterminate = indeterminate;
        }, 500);
      }
    }
  }

  $: setTimeout(() => _progress = stop ? Math.min(1, progress + 0.4) : (indeterminate ? 0 : (Math.max(0, progress) || 0)), 0);
</script>

<svg style="width: {size}px;height:{size}px;"
     width="35px" height="35px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
  {#if indeterminate || _indeterminate}
    <g class:exit={start}>
      <g class="spinner indeterminate">
        <circle class="circle indeterminate" class:primary class:secondary fill="none" stroke-width="8"
                stroke-linecap="round" cx="35" cy="35" r="30"></circle>
      </g>
    </g>
  {/if}
  {#if !indeterminate || !_indeterminate}
    <g class:exit={stop}>
      <g class="spinner determinate">
        <circle class="circle determinate" class:primary class:secondary fill="none" stroke-width="8"
                stroke-linecap="round" cx="35" cy="35" r="30" style:--progress={_progress * 188.49}></circle>
      </g>
    </g>
  {/if}
  <circle class="rail" fill="none" stroke-width="3" stroke-linecap="round" cx="35" cy="35" r="30"></circle>
</svg>

<style lang="scss">
  @import "src/lib/Style";

  .spinner {
    transform-origin: center;
    transform: rotate(-90deg);

    &.indeterminate {
      animation: rotation 1.35s linear infinite;
    }
  }

  .circle {
    @include applyTheme(stroke);

    stroke-dasharray: 180;
    stroke-dashoffset: 0;
    transform-origin: center;

    &.indeterminate {
      animation: turn 1.35s ease-in-out infinite;
    }

    &.determinate {
      stroke-dashoffset: 329.87;
      stroke-dasharray: var(--progress) calc(329.87 - var(--progress));
      transition: all 0.35s ease-in-out;
    }
  }

  .exit {
    @include AFadeOut(0.6s);
  }

  .rail {
    stroke: #99999944;
  }

  @keyframes rotation {
    0% {
      transform: rotate(-90deg);
    }

    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes turn {
    0% {
      stroke-dashoffset: 180;
    }

    50% {
      stroke-dashoffset: 45;
      transform: rotate(135deg);
    }

    100% {
      stroke-dashoffset: 180;
      transform: rotate(450deg);
    }
  }
</style>
