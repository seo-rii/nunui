<script lang="ts">
  import { onMount } from "svelte";

  export let duration = 300, opacity = 0.3, center = false, active = false,
    primary = true, secondary = false, error = false, surface = true, additional = null;

  export let clicked = false, hover = false;

  let container, adapter, lastAdditional;
  let x = 0, y = 0, size = 0, show = false, hide = false, back = false, ts = 0;

  $: clicked = show && !hide;
  $: hover = !clicked && back;
  $: {
    if (additional !== lastAdditional) {
      removeHandler(lastAdditional);
      applyHandler(additional);
      lastAdditional = additional;
    }
  }

  function rippleSize(targetX, targetY) {
    const rect = container.getBoundingClientRect();
    if (!center) {
      const size = Math.sqrt(rect.width ** 2 + rect.height ** 2) * 2,
        x = targetX - rect.left - size / 2 - window.scrollX,
        y = targetY - rect.top - size / 2 - window.scrollY;
      return { x, y, size };
    } else {
      const size = Math.max(rect.width, rect.height),
        x = rect.width / 2 - size / 2,
        y = rect.height / 2 - size / 2;
      return { x, y, size };
    }
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

  const applyHandler = (el) => {
    if (!el) return;
    el.addEventListener("mousemove", showBackground);
    el.addEventListener("mousedown", showRippleMouse);
    el.addEventListener("mouseup", hideRipple);
    el.addEventListener("mouseleave", exitRipple);
    el.addEventListener("touchstart", showRippleTouch);
    el.addEventListener("touchend", exitRipple);
    el.addEventListener("touchcancel", exitRipple);
  };

  const removeHandler = (el) => {
    if (!el) return;
    el.removeEventListener("mousemove", showBackground);
    el.removeEventListener("mousedown", showRippleMouse);
    el.removeEventListener("mouseup", hideRipple);
    el.removeEventListener("mouseleave", exitRipple);
    el.removeEventListener("touchstart", showRippleTouch);
    el.removeEventListener("touchend", exitRipple);
    el.removeEventListener("touchcancel", exitRipple);
  };

  onMount(() => {
    container = adapter.parentElement;
    container.style.overflow = "hidden";
    applyHandler(container);
    return () => removeHandler(container);
  });
</script>

<div class="adapter" bind:this={adapter} class:show class:hide style:--rop={opacity}>
  <div class="ripple" class:show class:primary class:secondary class:error class:surface
       style="--x:{x}px;--y:{y}px;--size:{size}px;--dur:{duration}ms;"></div>
</div>
<div class="back" class:show={back || active} style:--bop="0.2" class:primary class:secondary class:error
     class:surface></div>

<style lang="scss">
  @import "src/lib/Style";

  .adapter {
    @include full;
    @include CShow(var(--rop), 0);
    pointer-events: none;
    transition: background 0.3s;

    .ripple {
      @include round(round);
      position: absolute;
      left: var(--x);
      top: var(--y);
      width: var(--size);
      height: var(--size);
      background: #888888;

      @include applyThemeOn(background);

      &.surface {
        @include applyTheme(background);
      }

      &.show {
        @include AScaleIn(var(--dur), 0, forwards);
      }
    }

    &.hide {
      @include AFadeOut(0.2s, var(--rop));
    }
  }

  .back {
    @include full;
    @include CShow(var(--bop));
    background: #888888;

    &.surface {
      @include applyTheme(background);
    }

    &:not(.surface) {
      @include applyThemeOn(background);
    }
  }
</style>
