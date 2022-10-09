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

    function standardize_color(str) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = str;
        return ctx.fillStyle;
    }
</script>

<main style:--primary={primary} style:--secondary={secondary} style:--error={error} style:--background={background}
      style:--surface={surface} style:--on-primary={onPrimary} style:--on-secondary={onSecondary}
      style:--on-error={onError} style:--on-background={onBackground} style:--on-surface={onSurface}

      style:--primary-light1="{standardize_color(primary)}05" style:--primary-light2="{standardize_color(primary)}0a"
      style:--primary-light3="{standardize_color(primary)}10" style:--primary-light4="{standardize_color(primary)}15"
      style:--primary-light5="{standardize_color(primary)}1a" style:--primary-light6="{standardize_color(primary)}20"
      style:--secondary-light1="{standardize_color(secondary)}05" style:--secondary-light2="{standardize_color(secondary)}0a"
      style:--secondary-light3="{standardize_color(secondary)}10" style:--secondary-light4="{standardize_color(secondary)}15"
      style:--secondary-light5="{standardize_color(secondary)}1a" style:--secondary-light6="{standardize_color(secondary)}20">
    <slot/>
</main>
