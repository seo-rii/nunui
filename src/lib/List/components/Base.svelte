<script lang="ts">
    import Ripple from "$lib/Ripple";

    export let round = true;
</script>

<main class:round>
    <slot/>
    <Ripple/>
</main>

<style lang="scss">
  main {
    display: block;
    position: relative;
    cursor: pointer;
    padding: 8px;

    &.round {
      border-radius: 100px;
    }
  }
</style>
