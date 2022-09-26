<script lang="ts">
  import { onMount } from "svelte";

  export let duration = 300, opacity = 0.3,
    primary = true, secondary = false, surface = false;

  let container, adapter;
  let x = 0, y = 0, size = 0, show = false, hide = false, back = false, ts = 0;

  function rippleSize(targetX, targetY) {
    const rect = container.getBoundingClientRect();
    const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2,
      x = targetX - rect.left - size / 2,
      y = targetY - rect.top - size / 2;
    return { x, y, size };
  }

  function rippleShowEvent(targetX, targetY) {
    show = hide = false;
    ({ x, y, size } = rippleSize(targetX, targetY));
    ts = Date.now();
    new Promise((resolve) => setTimeout(resolve, 50)).then(() => show = true);
  }

  const showRippleMouse = ({ pageX, pageY }) => rippleShowEvent(pageX, pageY),
    showRippleTouch = (e) => {
      e.preventDefault();
      back = false;
      rippleShowEvent(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    };

  const hideRipple = () => new Promise((resolve) => setTimeout(resolve, Math.max(0, duration - (Date.now() - ts)))).then(() => hide = true),
    exitRipple = () => hideRipple().then(() => back = false);

  const showBackground = () => back = true;

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

<div class="adapter" bind:this={adapter} class:show class:hide style:--rop={opacity}>
  <div class="ripple" class:show class:primary class:secondary class:surface
       style="--x:{x}px;--y:{y}px;--size:{size}px;--dur:{duration}ms;"></div>
</div>
<div class="back" class:show={back} style:--bop="0.1" class:primary class:secondary class:surface></div>

<style lang="scss">
  @import "src/lib/Style";

  .adapter {
    @include full;
    @include CShow(var(--rop), 0);
    pointer-events: none;
    transition: background 0.3s;

    .ripple {
      @include applyTheme(background);
      @include round(round);
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);

      &.show {
        @include AScaleIn(var(--dur), 0, forwards);
      }
    }

    &.hide {
      @include AFadeOut(0.2s, var(--rop), forwards);
    }
  }

  .back {
    @include full;
    @include CShow(var(--bop));
    @include applyTheme(background);
  }
</style>
