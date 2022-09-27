<script lang="ts">
  import Icon from "$lib/Icon";
  import Ripple from "$lib/Ripple";
  import Blocker from "$lib/Blocker";

  export let icon: string, size = 36, outlined = false, style = "", disabled = false;

  let clicked = false, active = false;
</script>

<style lang="scss">
  @import "src/lib/Style";

  .container {
    @include round(100px);
    display: inline-block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: var(--icon-size);

    .iconButton {
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
    }
  }
</style>

<div class="container" style="--size:{size}px;{style}" on:click>
  <div class="iconButton">
    <Icon icon={icon} size={size*0.7} weight={(!disabled && active && !clicked) ? 500 : 300} {outlined} />
  </div>
  <Ripple center primary bind:clicked bind:active />
  <Blocker active={disabled} />
</div>
