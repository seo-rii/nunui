<script lang="ts">

    import forward from "$lib/Utility/forward.js";

    const ev = forward();

    export let icon: string = Object.keys($$restProps)[0] || ''
        , color = "", outlined = false, size: any = 0, style = "", weight: number = <any>undefined;

    $: _weight = weight ? `--weight:${weight};` : '';
    $: _fill = outlined ? '--fill:0;' : ``;
    $: _color = color ? `color:${color};` : '';
    $: _size = size ? `font-size:${size}px;` : '';
</script>

<span use:ev class="notranslate" {...$$restProps} style="{_fill}{_weight}{_color}{_size}{style}">{icon}</span>

<style lang="scss">
  @font-face {
    font-family: 'Material Symbols Rounded';
    font-style: normal;
    font-weight: 100 700;
    src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v122/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsLjBuVY.woff2) format('woff2');
    font-display: block;
  }

  span {
    font-family: 'Material Symbols Rounded';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    user-select: none;
    vertical-align: bottom;
    transition: all 0.2s;

    font-variation-settings: 'FILL' var(--fill, 1),
    'wght' var(--weight, 500),
    'GRAD' 0
  }
</style>
