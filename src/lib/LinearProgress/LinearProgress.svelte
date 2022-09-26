<script lang="ts">
  export let progress = 0, width = "100%", style = "", indeterminate = false, secondary = false, primary = !secondary;

  let _progress, _indeterminate = indeterminate, startProgress = false;

  $: {
    if (indeterminate !== _indeterminate) {

      if (!indeterminate) {
        startProgress = true;
        setTimeout(() => {
          startProgress = false;
          _indeterminate = indeterminate;
        }, 200);
      } else {
        _indeterminate = indeterminate;
      }
    }
  }
  $: setTimeout(() => (_progress = (Math.max(0, progress) || 0)), 0);
</script>

<style lang="scss">
  @import "src/lib/Style";

  .progressContainer {
    @include round(50px);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 8px;
  }

  .progressBar {
    @include round(50px);
    position: absolute;
    background-color: #e2e2e2;
    top: 3px;
    height: 2px;
    width: 100%;
  }

  .progressIndicator {
    @include applyTheme(background);
    position: absolute;
    top: -2px;
    left: 0;
    border-radius: 5px;
    transition: all 0.3s ease;
    height: 6px;
  }

  .ind-1 {
    animation: ind-1 3s ease-in infinite;
  }

  .ind-2 {
    animation: ind-2 3s ease-out infinite;
  }

  .exit {
    animation: fadeOut .2s ease-in forwards;
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

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
</style>

<div class="progressContainer" style={`width: ${width};${style}`}>
  <div class="progressBar">
    {#if _indeterminate}
      <div class:exit={startProgress}>
        <div class="progressIndicator ind-1" class:primary class:secondary></div>
        <div class="progressIndicator ind-2" class:primary class:secondary></div>
      </div>
    {/if}
    {#if !indeterminate}
      <div class="progressIndicator" style={`width: ${(_progress||0) * 100}%`} class:primary class:secondary></div>
    {/if}
  </div>
</div>
