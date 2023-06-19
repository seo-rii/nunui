<script lang='ts'>
    import Icon from '$lib/Icon';
    import {createEventDispatcher, setContext, tick} from 'svelte';
    import Paper from "$lib/Paper/Paper.svelte";
    import List from "$lib/List/List.svelte";
    import {writable} from "svelte/store";
    import Ripple from "$lib/Ripple/Ripple.svelte";

    export let outlined = false;
    export let placeholder: string, error = '', fullWidth = false;
    export let helper = '';
    export let round = false, nohelper = false, tabindex = undefined;
    export let style = '';
    export let multiple = false, selected = null, separator = ', ';
    export let override = false;

    let open = false, hide, clientWidth;

    const _multiple = writable(false);
    const _selected = writable(selected);
    const target = writable();
    const display = writable([]);
    const dispatch = createEventDispatcher();

    $: $_multiple = multiple;

    const update = () => {
        if (selected !== $_selected) {
            $_selected = selected;
            dispatch('select', selected);
        }
    }
    $: tick().then(() => selected = $_selected);
    $: {
        void selected;
        tick().then(update);
    }

    setContext('hide', () => hide?.());
    setContext('multiple', _multiple);
    setContext('selected', _selected);
    setContext('display', display);
    setContext('target', target);
</script>

<Paper forceRender bind:open bind:hide left bottom xstack width="{clientWidth}px">
    <span slot="target" style="display: inline-block;margin: 0;position: relative;left: 0;"></span>
    <List>
        <slot/>
    </List>
</Paper>
<span class='container' class:error class:fullWidth class:round class:outlined bind:clientWidth>
	<div style='position: relative;' on:click={() => setTimeout(() => open = true, 1)}>
		<div class='input' type='text' placeholder='&nbsp;' on:change on:keydown class:focus={open}
             class:active={open || $display.length} {tabindex} on:keydown={(e)=>{
				if (e.key === 'Enter') open = true;
			 }} {style} class:outlined>
            {#if override}
                <span bind:this={$target}></span>
            {:else}
                <span>{$display.map(e => e.title).join(separator)}</span>
            {/if}
            <Ripple/>
        </div>
        <span class='placeholder'>{placeholder}</span>
        {#if !outlined}
			<span class='background' class:round></span>
		{/if}
        <div class='trailingIcon' class:open>
			<Icon icon="expand_more" size='26'/>
		</div>
	</div>
    {#if !nohelper && (error || helper)}
		<span class='helper'><span
                style='position: relative;top:-2px;margin-left: 2px;'>{error || helper}</span></span>
	{/if}
</span>

<style lang='scss'>
  * {
    box-sizing: border-box;
  }

  .container {
    --border: 5px 5px 0 0;

    font-size: 1.1em;
    display: inline-block;
    position: relative;
    left: -4px;
    margin: auto;
    width: 100%;
    max-width: 280px;
    border-radius: var(--border);
    overflow: hidden;

    &:not(.outlined) {
      background: var(--primary-light1);
    }

    .input {
      color: var(--on-surface);
    }

    &.outlined {
      --border: 5px;
    }

    &.round {
      border-radius: 100px;

      .input {
        border-radius: 100px;

        &:not(.outlined) {
          border-bottom: none !important;
        }
      }
    }

    &.fullWidth {
      display: inline-block;
      max-width: unset;

      .helper {
        display: contents;
      }
    }

    .placeholder {
      position: absolute;
      top: 12px;
      left: 10px;
      font-size: 1em;
      color: var(--on-surface);
      font-weight: 300;
      transform-origin: 0 0;
      transform: translate3d(0, 0, 0);
      transition: all .2s ease;
      pointer-events: none;
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--border);

      &.round {
        border-radius: 100px;
      }

      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
      opacity: 0;
      transition: opacity .2s ease, transform .2s cubic-bezier(1, 0, 1, 0);
    }

    .input {
      border: none;
      outline: none;
      font-weight: 300;
      border-radius: var(--border);
      width: 100%;
      cursor: pointer;

      font-size: 1em;
      height: calc(1.5em + 18px);
      padding: 0.4em 8px 0 8px;

      font-family: inherit;
      transition: all .15s ease;
      position: relative;
      overflow: hidden;

      span {
        position: relative;
        top: 6px;
      }

      &.outlined {
        background: unset;
        border: solid 1px var(--on-surface);
        padding: 0 8px;
        height: 42px;

        & + .placeholder {
          top: 4px;
          left: 6px;
          padding: 4px;
        }
      }

      &:not(.outlined) {
        border-bottom: 1px solid #bbb;
      }

      &.active + .placeholder {
        transform: translate3d(0, -8px, 0) scale(.5);
      }

      &.outlined.active + .placeholder {
        transform: translate3d(0, -12px, 0) scale(.5);
        background-color: var(--surface);
      }

      &.focus {
        transition: all .15s ease;

        & + .placeholder {
          transform: translate3d(0, -8px, 0) scale(.5);
          color: var(--primary);
          opacity: 1;

          & + .background {
            transform: scaleX(1);
            opacity: 1;
            transition: all .2s ease;
          }
        }

        &.outlined {
          border: solid 1px var(--primary);

          & + .placeholder {
            transform: translate3d(0, -12px, 0) scale(.5);
            background-color: var(--surface);
          }
        }

        &:not(.outlined) {
          border-bottom: 1px solid var(--primary);
        }
      }
    }


    &.error {
      .input {
        &:not(.outlined) {
          border-bottom: 1px solid #d33f3f;
        }

        &.focus + .placeholder {
          color: var(--error);
        }
      }

      .helper {
        color: var(--error);
        opacity: 1;
      }
    }

    .trailingIcon {
      position: absolute;
      padding: 6px;
      right: 0;
      top: 3px;
      border-radius: 100px;
      cursor: pointer;
      --weight: 300;
      transition: transform .2s ease;

      &.open {
        transform: rotate(180deg);
      }

      &:hover {
        --weight: 400;
      }
    }
  }

  .helper {
    display: inline-block;
    margin-top: 5px;
    font-size: 12px;
    transition: all .2s ease;
    position: absolute;
    top: 100%;
    color: var(--on-surface);
    opacity: 0.7;
  }
</style>
