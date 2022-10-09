<script lang="ts">
    export let primary = '#6200ee',
        secondary = '#03dac6',
        error = '#b00020',
        background = '#ffffff',
        surface = '#ffffff',
        onPrimary = '#ffffff',
        onSecondary = '#000000',
        onError = '#ffffff',
        onBackground = '#000000',
        onSurface = '#000000'

    function standardize_color(canvas, str) {
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = str;
        return ctx.fillStyle;
    }

    let c;
</script>

<main style:--primary={primary} style:--secondary={secondary} style:--error={error} style:--background={background}
      style:--surface={surface} style:--on-primary={onPrimary} style:--on-secondary={onSecondary}
      style:--on-error={onError} style:--on-background={onBackground} style:--on-surface={onSurface}

      style:--primary-light1="{standardize_color(c, primary)}05" style:--primary-light2="{standardize_color(c, primary)}0a"
      style:--primary-light3="{standardize_color(c, primary)}10" style:--primary-light4="{standardize_color(c, primary)}15"
      style:--primary-light5="{standardize_color(c, primary)}1a" style:--primary-light6="{standardize_color(c, primary)}20"
      style:--secondary-light1="{standardize_color(c, secondary)}05"
      style:--secondary-light2="{standardize_color(c, secondary)}0a"
      style:--secondary-light3="{standardize_color(c, secondary)}10"
      style:--secondary-light4="{standardize_color(c, secondary)}15"
      style:--secondary-light5="{standardize_color(c, secondary)}1a"
      style:--secondary-light6="{standardize_color(c, secondary)}20">
    <slot/>
</main>
<canvas bind:this={c}></canvas>
