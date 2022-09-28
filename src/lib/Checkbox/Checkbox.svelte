<script lang="ts">
  import Ripple from "../Ripple/Ripple.svelte";

  export let secondary = false, primary = !secondary, label = "";

  export let error = false, checked;

  let checkbox, container;
</script>

<span class="checkbox" class:primary class:secondary class:error on:click on:click={()=>checkbox.click()}
      bind:this={container}>
  <div class="ripple">
    <Ripple additional={container} center surface={!!checked} primary={primary && !!checked} secondary={secondary && !!checked} />
  </div>
  <input type="checkbox" name="checkbox" bind:this={checkbox} class:primary class:secondary bind:checked>
  <label class:primary class:secondary>{label}</label>
  {#if error}<span class="message">{error}</span>{/if}
</span>

<style lang="scss">
  @import "src/lib/Style";

  .checkbox {
    position: relative;
    margin-bottom: .8rem;
    display: inline-block;

    .ripple {
      position: absolute;
      top: 0rem;
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
      font-size: 1.6rem;
      user-select: none;
      font-weight: 400;
      vertical-align: middle;

      &:before {
        width: 1rem;
        height: 1rem;
        border: .15rem solid rgba(0, 0, 0, .45);
        content: '';
        display: inline-block;
        transition: all .3s ease;
        user-select: none;
        will-change: background-color, border-color;
        margin: 0 0.5rem 0 0;
        border-radius: .3rem;
        vertical-align: middle;
        background-color: white;
      }

      &:after {
        top: 0.9rem;
        left: 0.5rem;
        width: 0.75rem;
        border: .15rem solid white;
        height: 0.375rem;
        content: '';
        position: absolute;
        transform: scale(0, 0) rotate(-90deg) translateZ(0);
        transition: all .2s ease;
        will-change: transform;
        transform-origin: bottom left;
        border-top-style: none;
        border-right-style: none;
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
      font-size: 1.4rem;
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
