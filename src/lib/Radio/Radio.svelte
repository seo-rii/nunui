<script lang="ts">
    import Ripple from "$lib/Ripple";

    export let secondary = false, primary = !secondary, label = "", name = "", value, group;

    export let error = false;

    let radio, container, checked;

    $: checked = value === group;
</script>

<div class="radio" bind:this={container} on:click={()=>radio.click()}
     on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
     on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
     on:drop on:scroll>
    <div class="ripple">
        <Ripple additional={container} center surface={!!checked} primary={primary && !!checked}
                secondary={secondary && !!checked} error={error && !!checked}/>
    </div>
    <input type="radio" {name} bind:this={radio} bind:group {value}>
    <label class:primary class:secondary class:error>{label}</label>
</div>

<style lang="scss">
  @import "src/lib/Style";

  .radio {
    display: inline-block;
    position: relative;
    margin-bottom: .8rem;
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

      &:before {
        width: 1rem;
        border: .15rem solid rgba(0, 0, 0, .45);
        height: 1rem;
        content: '';
        display: inline-block;
        transition: all .3s ease;
        will-change: background-color, border-color;
        user-select: none;
        margin: 0 0.5rem 0.2rem 0;
        border-radius: 50%;
        vertical-align: middle;
        background-color: white;
      }

      &:after {
        position: absolute;
        top: .3rem;
        left: .3rem;
        width: 0.7rem;
        height: 0.7rem;
        content: '';
        transform: scale(0, 0) translateZ(0);
        transform-origin: center;
        transition: all .2s ease;
        will-change: transform;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .45);
      }
    }

    input[type=radio] {
      display: none;

      &:checked {
        + label {
          @include applyTheme(border-color, '', ':before');
          @include applyTheme(background-color, '', ':after');

          &:after {
            transform: scale(1, 1) translateZ(0);
          }
        }
      }
    }

    .message {
      color: inherit;
      display: block;
      font-size: 1.4rem;
      margin-left: 1rem+ calc(1rem / 2) + (.15rem * 2);
    }

    &.error {
      color: var(--error);

      label:before {
        border-color: var(--error);
      }

      span {
        display: block;
      }

      input[type=radio]:checked + label {
        &:before {
          border-color: var(--error);
        }

        &:after {
          background-color: var(--error);
        }
      }
    }
  }

</style>
