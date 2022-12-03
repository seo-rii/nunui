<script lang='ts'>
    import IconButton from '$lib/IconButton';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let outlined = false;
    export let placeholder: string, value = '', multiline = false, error = '', fullWidth = false;
    export let required = false, number = false, min = null, max = null, helper = '';
    export let autofocus = false, password = false, trailingIcon = '', round = false, nohelper = false,
        autocapitalize = undefined, tabindex = undefined;
    export let input = null, style = '';

    let rf, _error;

    $: {
        if (!value && required) _error = '필수 항목입니다.';
        else if (number && !/^[\-]?[0-9]+(\.[0-9]+)?$/.test(value)) _error = '숫자만 입력해주세요.';
        else if (number && ((min !== undefined && parseFloat(value) < min) || (max !== undefined && parseFloat(value) > max))) _error = `${min}부터 ${max}까지의 숫자를 입력해주세요.`;
        else _error = error;
    }

    $: if (multiline) {
        let _ = value;
        rf = rf;
        setTimeout(() => {
            if (input) {
                input.style.height = 'auto';
                input.style.height = Math.max(input.scrollHeight + 2, 46) + 'px';
            }
        })
    }
</script>

<span class='container' class:error={_error} class:fullWidth class:round class:outlined>
	<div style='position: relative;'>
		{#if multiline}
			<textarea class='input' placeholder='&nbsp;' bind:value on:change on:keydown bind:this={input} rows='1'
                      cols='1' on:focus={()=>(rf=!rf)} {autofocus} on:focus on:blur {autocapitalize} {tabindex}
                      {style} class:outlined></textarea>
		{:else}
			{#if password}
				<input class='input' type='password' placeholder='&nbsp;' bind:value on:change on:keydown {autofocus}
                       on:focus
                       on:blur {autocapitalize} {tabindex} on:keydown={(e)=>{
								if (e.key === 'Enter') {
									dispatch('submit', value);
								}
							}} bind:this={input} {style} class:outlined/>
            {:else if number}
				<input class='input' type='number' placeholder='&nbsp;' bind:value on:change on:keydown {autofocus}
                       on:focus
                       on:blur {autocapitalize} {tabindex} on:keydown={(e)=>{
								if (e.key === 'Enter') {
									dispatch('submit', value);
								}
							}} bind:this={input} {style} class:outlined/>
            {:else}
				<input class='input' type='text' placeholder='&nbsp;' bind:value on:change on:keydown {autofocus}
                       on:focus
                       on:blur {autocapitalize} {tabindex} on:keydown={(e)=>{
								if (e.key === 'Enter') {
									dispatch('submit', value);
								}
							}} bind:this={input} {style} class:outlined/>
            {/if}
		{/if}
        <span class='placeholder'>{placeholder}</span>
        {#if !outlined}
			<span class='background' class:round></span>
		{/if}
        {#if trailingIcon}
			<div class='trailingIcon'>
				<IconButton icon={trailingIcon} size='34'/>
			</div>
		{/if}
	</div>
    {#if !nohelper && (_error || helper)}
		<span class='helper'><span
                style='position: relative;top:-2px;margin-left: 2px;'>{_error || helper}</span></span>
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

      appearance: none;
      font-family: inherit;
      padding: 8px 8px 0 8px;
      height: 46px;
      background: rgba(92, 102, 121, 0.03);
      transition: all .15s ease;

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

      &:not(:placeholder-shown) + .placeholder {
        transform: translate3d(0, -8px, 0) scale(.5);
      }

      &.outlined:not(:placeholder-shown) + .placeholder {
        transform: translate3d(0, -12px, 0) scale(.5);
        background-color: var(--surface);
      }

      &:focus {
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

    textarea.input {
      padding: 20px 8px 8px 8px;
      transition: height 0.2s ease-in-out;
      width: 100%;
      overflow: auto;
      resize: none;

      & + .placeholder + .background {
        height: calc(100% - 5px);
      }
    }

    &.error {
      .input {
        &:not(.outlined) {
          border-bottom: 1px solid #d33f3f;
        }

        &:focus + .placeholder {
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
      top: 0;
      border-radius: 100px;
      backdrop-filter: blur(5px);
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
