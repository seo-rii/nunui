<script lang='ts'>
    import Icon from '$lib/Icon';
    import {createEventDispatcher, setContext} from 'svelte';
    import Paper from "$lib/Paper/Paper.svelte";
    import List from "$lib/List/List.svelte";
    import {writable} from "svelte/store";

    export let outlined = false;
    export let placeholder: string, error = '', fullWidth = false;
    export let helper = '';
    export let round = false, nohelper = false, tabindex = undefined;
    export let style = '';
    export let multiple = false, selected = null, separator = ', ';

    let open = false, hide, clientWidth;

    const _multiple = writable(false);
    const _selected = writable();
    const display = writable([]);
    const dispatch = createEventDispatcher();

    $: $_multiple = multiple;

    const update = () => {
        if (selected !== $_selected) {
            $_selected = selected;
            dispatch('select', selected);
        }
    }
    $: selected = $_selected;
    $: {
        void selected;
        update();
    }

    setContext('hide', () => hide?.());
    setContext('multiple', _multiple);
    setContext('selected', _selected);
    setContext('display', display);
</script>

<Paper bind:open bind:hide left bottom xstack width="{clientWidth}px">
    <span slot="target" style="display: inline-block;margin: 0;position: relative;left: 4px;"></span>
    <List>
        <slot/>
    </List>
</Paper>
<span class='container' class:error class:fullWidth class:round class:outlined bind:clientWidth>
	<div style='position: relative;'>
		<div class='input' type='text' placeholder='&nbsp;' on:change on:keydown
             class:focus={open} class:active={open || $display.length} {tabindex}
             on:click={() => setTimeout(() => open = !open, 1)}
             on:keydown={(e)=>{
				if (e.key === 'Enter') {
					open = true;
				}
			}} {style} class:outlined><span>{$display.map(e => e.title).join(separator)}</span></div>
        <span class='placeholder'>{placeholder}</span>
        {#if !outlined}
			<span class='background' class:round></span>
		{/if}
        <div class='trailingIcon' class:open on:click={() => setTimeout(() => open = true, 1)}>
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

    display: inline-block;
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 280px;
    border-radius: var(--border);

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
      display: inline;
      max-width: unset;

      .helper {
        display: contents;
      }
    }

    .placeholder {
      position: absolute;
      top: 12px;
      left: 10px;
      font-size: 18px;
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

      background: rgba(92, 102, 121, 0.06);
      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
      opacity: 0;
      transition: opacity .2s ease, transform .2s cubic-bezier(1, 0, 1, 0);
    }

    .input {
      font-size: 18px;
      border: none;
      outline: none;
      font-weight: 300;
      border-radius: var(--border);
      width: 100%;
      cursor: pointer;

      font-family: inherit;
      padding: 8px 8px 0 8px;
      height: 46px;
      background: rgba(92, 102, 121, 0.03);
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
