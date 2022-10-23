<script lang="ts">
    export let icon: string, color = "", outlined = false, size = 0, style = "", weight: number = <any>undefined;
</script>

<span on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseout
      on:mouseover on:mouseup on:select on:wheel on:drag on:dragend on:dragenter on:dragleave on:dragover on:dragstart
      on:drop on:scroll
      style="--fill:{outlined ? 0 : 1};{weight?`--weight:${weight || 500};`:''}{color ? `color:${color};` : ''}{size?`font-size:${size}px;`:''}{style}">{icon || ''}</span>

<style lang="scss">
  @font-face {
    font-family: 'Material Symbols Rounded';
    font-style: normal;
    font-weight: 100 700;
    src: url(https://fonts.gstatic.com/s/materialsymbolsrounded/v56/sykg-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjzaqkNCeE.woff2) format('woff2');
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

    font-variation-settings: 'FILL' var(--fill),
    'wght' var(--weight),
    'GRAD' 0
  }
</style>
