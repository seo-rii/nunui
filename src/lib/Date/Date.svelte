<script lang="ts">
    import {DatePicker} from 'date-picker-svelte'
    import {ko} from 'date-fns/locale'
    import {Input, Paper} from "$lib";

    export let value, min, max;
    let display = '', _display = '';

    $: {
        if (!value) _display = '';
        else if (value instanceof Date) _display = value.toLocaleDateString();
        else if (typeof value === 'string') _display = value;
        else _display = '';
    }
    $: if (display !== _display) display = _display;
</script>

<Paper left bottom xstack>
    <Input bind:value={display} {...$$restProps} slot="target"/>
    <main>
        <DatePicker locale={ko} {min} {max} bind:value/>
    </main>
</Paper>

<style lang="scss">
  main {
    --date-picker-foreground: var(--on-surface);
    --date-picker-background: transparent;
    --date-picker-highlight-border: var(--primary);
    --date-picker-selected-color: #000;
    --date-picker-selected-background: var(--primary-light2);

    :global(.date-time-picker) {
      box-shadow: none !important;
      border: none !important;
    }
  }
</style>