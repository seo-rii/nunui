<script lang="ts">
  export let progress = 0, indeterminate = false, size = 60, secondary = false, primary = !secondary;
</script>

<svg class="spinner" class:indeterminate style="width: {size}px;height:{size}px;"
     width="35px" height="35px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
  <circle class="circle" class:primary class:secondary class:indeterminate fill="none" stroke-width="8"
          stroke-linecap="round" cx="35" cy="35" r="30" style:--progress={progress * 188.49}></circle>
  <circle class="rail" fill="none" stroke-width="3" stroke-linecap="round" cx="35" cy="35" r="30"></circle>
</svg>

<style lang="scss">
  @import "src/lib/Style";

  .spinner {
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

    &:not(.indeterminate) {
      stroke-dashoffset: 329.87;
      stroke-dasharray: var(--progress) calc(329.87 - var(--progress));
      transform: rotate(-90deg);
      transition: all 0.35s ease-in-out;
    }
  }

  .rail {
    stroke: #99999944;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(270deg);
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
