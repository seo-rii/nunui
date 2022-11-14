<script lang="ts">
  export let active = false;
</script>

<div class="blocker" class:active></div>

<style lang="scss">
  @import "src/lib/Style";

  .blocker {
    @include full;
    background-color: var(--surface);
    opacity: 0;
    pointer-events: none;

    &.active {
      opacity: 0.5;
      pointer-events: initial;
      cursor: not-allowed;
      z-index: 1;
    }
  }
</style>
