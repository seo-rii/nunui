<script lang="ts">
  export let icon: string, color = "", outlined = false, size = 0, style = "", weight = 500;
</script>

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
    font-size: 24px;
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

    font-variation-settings: 'FILL' 0,
    'wght' var(--weight),
    'GRAD' 0
  }
</style>

<span style="--weight:{weight};{color ? `color:${color};` : ''}{size?`font-size:${size}px;`:''}{style}">{icon}</span>
