<script lang="ts">
    import Ripple from "$lib/Ripple";

    export let secondary = false, primary = !secondary, label = "";

    export let error = false, checked;

    let checkbox, container;
</script>

<span class="checkbox" class:primary class:secondary class:error on:click={()=>checkbox.click()}
      bind:this={container}
      on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll>
  <div class="ripple">
    <Ripple additional={container} center surface={!!checked} primary={primary && !!checked}
            secondary={secondary && !!checked} error={error && !!checked}/>
  </div>
  <input type="checkbox" name="checkbox" bind:this={checkbox} class:primary class:secondary bind:checked>
  <label class:primary class:secondary>{label}</label>
    {#if error}<span class="message">{error}</span>{/if}
</span>

<style lang="scss">
  @import "src/lib/Style";

  .checkbox {
    position: relative;
    margin-bottom: .6rem;
    display: inline-block;
    margin-left: 0.6rem;
    cursor: pointer;

    .ripple {
      position: absolute;
      top: -0.5rem;
      left: -0.5rem;
      width: 2.3rem;
      height: 2.3rem;
      z-index: 1;
      border-radius: 100px;
    }

    label {
      color: inherit;
      cursor: pointer;
      display: block;
      position: relative;
      user-select: none;
      font-weight: 400;
      vertical-align: middle;
      @include applyThemeOn(border-left, .12rem solid, ':after');
      @include applyThemeOn(border-bottom, .12rem solid, ':after');

      &:before {
        width: 1rem;
        height: 1rem;
        border: .12rem solid rgba(0, 0, 0, .45);
        content: '';
        display: inline-block;
        transition: all .3s ease;
        user-select: none;
        will-change: background-color, border-color;
        margin: -0.14rem 0.5rem 0 0;
        border-radius: .3rem;
        vertical-align: middle;
      }

      &:after {
        position: absolute;
        top: 0.5rem;
        left: 0.45rem;
        width: 0.75rem;
        height: 0.35rem;
        content: '';
        transform: scale(0, 0) rotate(-90deg) translateZ(0);
        transition: all .2s ease;
        will-change: transform;
        transform-origin: bottom left;
      }
    }

    input[type=checkbox] {
      display: none;

      &:checked {
        + label {
          @include applyTheme(background-color, '', ':before');
          @include applyTheme(border-color, '', ':before');

          &:after {
            transform: scale(1, 1) rotate(-45deg) translateZ(0);
          }
        }
      }
    }

    .message {
      color: inherit;
      font-size: 0.85rem;
      margin-left: 1.8rem;
    }

    &.error {
      color: var(--error);

      label:before {
        border-color: var(--error);
      }

      span {
        display: block;
      }

      input[type=checkbox]:checked + label {
        &:before {
          background-color: var(--error);
          border-color: var(--error);
        }
      }
    }
  }
</style>
