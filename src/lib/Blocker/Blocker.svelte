<script lang="ts">
  export let active = false;
</script>

<div class="blocker" class:active></div>

<style lang="scss">
  @import "src/lib/Style";

  .blocker {
    @include full;
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: initial;
      cursor: not-allowed;
      z-index: 1;
    }
  }
</style>
