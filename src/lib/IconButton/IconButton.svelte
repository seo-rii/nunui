<script lang="ts">
  import Icon from "$lib/Icon";
  import Ripple from "$lib/Ripple";
  import Blocker from "$lib/Blocker";

  export let icon: string, flat = false, size = 36, outlined = undefined, style = "", disabled = false, active = false;

  let clicked = false, hover = false;
</script>

<div class="container" style="--size:{size}px;{style}" on:click>
  <div class="button" class:flat>
    <Icon icon={icon} size={size*0.7} weight={disabled ? 300 : (clicked ? 200 : (hover ? 500 : 300))} outlined={outlined === undefined ? !active : outlined} />
  </div>
  <Ripple center primary bind:clicked bind:hover {active} opacity={disabled ? 0 : undefined} />
  <Blocker active={disabled} />
</div>

<style lang="scss">
  @import "src/lib/Style";

  .container {
    @include round(100px);
    display: inline-block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: var(--icon-size);

    .button {
      width: var(--size);
      height: var(--size);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      transition: all 0.2s;

      & :global(*) {
        font-size: calc(var(--size) * 0.7);
        line-height: calc(var(--size) * 0.7);
      }

      &.flat {
        width: calc(var(--size) * 1.25);
        height: calc(var(--size) * 0.75);
      }
    }
  }
</style>
