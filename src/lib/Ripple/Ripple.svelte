<script lang="ts">
  import { onMount } from "svelte";

  export let duration = 300;

  let container, adapter, ripple;
  let x = 0, y = 0, size = 0, show = false, hide = false, back = false, ts = 0;

  function rippleSize(targetX, targetY) {
    const rect = container.getBoundingClientRect();
    const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2,
      x = targetX - rect.left - size / 2,
      y = targetY - rect.top - size / 2;
    return { x, y, size };
  }

  async function rippleShowEvent(targetX, targetY) {
    show = hide = false;
    ({ x, y, size } = rippleSize(targetX, targetY));
    await new Promise((resolve) => setTimeout(resolve, 50));
    show = true;
    ts = Date.now();
  }

  const showRippleMouse = ({ pageX, pageY }) => rippleShowEvent(pageX, pageY);
  const showRippleTouch = (e) => {
    e.preventDefault();
    back = false;
    rippleShowEvent(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  };

  async function hideRipple() {
    await new Promise((resolve) => setTimeout(resolve, Math.max(0, duration - (Date.now() - ts))));
    hide = true;
  }

  function exitRipple() {
    hideRipple();
    back = false;
  }

  function showBackground() {
    back = true;
  }

  onMount(() => {
    container = adapter.parentElement;
    container.style.overflow = "hidden";
    container.addEventListener("mousemove", showBackground);
    container.addEventListener("mousedown", showRippleMouse);
    container.addEventListener("mouseup", hideRipple);
    container.addEventListener("mouseleave", exitRipple);
    container.addEventListener("touchstart", showRippleTouch);
    container.addEventListener("touchend", exitRipple);
    container.addEventListener("touchcancel", exitRipple);

    return () => {
      container.style.overflow = "";
      container.removeEventListener("mousedown", showRippleMouse);
      container.removeEventListener("mouseup", hideRipple);
      container.removeEventListener("mouseleave", exitRipple);
      container.removeEventListener("touchstart", showRippleTouch);
      container.removeEventListener("touchend", exitRipple);
      container.removeEventListener("touchcancel", exitRipple);
    };
  });
</script>

<div class="adapter" bind:this={adapter} class:show class:hide>
  <div class="ripple" style="--x:{x}px;--y:{y}px;--size:{size}px;--dur:{duration}ms;"
       bind:this={ripple} class:show></div>
</div>
<div class="back" class:show={back}></div>

<style lang="scss">
  @import "../Style/index";

  .adapter {
    @include full;
    pointer-events: none;
    transition: background 0.3s;
    opacity: 0;

    .ripple {
      position: absolute;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);
      border-radius: 100%;
      background: #12345678;

      &.show {
        animation: ripple var(--dur) forwards;
      }
    }

    &.show {
      opacity: var(--ripple-opacity);
    }

    &.hide {
      @include fadeOut(0.2s, var(--ripple-opacity), forwards);
    }
  }

  .back {
    @include full;
    background: #12345678;
    transition: opacity 0.3s;
    opacity: 0;

    &.show {
      opacity: var(--back-opacity);
    }
  }

  @keyframes ripple {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
</style>
