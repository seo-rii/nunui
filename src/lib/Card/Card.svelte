<script lang="ts">
  export let outlined, secondary = false, primary = !secondary;
</script>

<main class:primary class:secondary class:outlined>
  <slot />
  <div class="background" class:primary class:secondary></div>
</main>

<style lang="scss">
  @import "src/lib/Style";

  main {
    margin: 5px;
    padding: 10px;
    position: relative;
    overflow: hidden;
    @include shadow(medium);
    @include round;

    &.outlined {
      @include applyTheme(border, 1px solid);
      padding: 9px;
      box-shadow: none;
    }

    .background {
      @include full;
      @include applyTheme(background);
      opacity: 0.1;
    }
  }
</style>
