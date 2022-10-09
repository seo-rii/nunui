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

    function norm(canvas, str) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = str;
        return ctx.fillStyle;
    }

    function mix(colorA, colorB, amount) {
        if (!colorA || !colorB) return;
        const [rA, gA, bA] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
        const [rB, gB, bB] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
        const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
        const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
        const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
        return '#' + r + g + b;
    }

    let c;
</script>

<main style:--primary={primary} style:--secondary={secondary} style:--error={error} style:--background={background}
      style:--surface={surface} style:--on-primary={onPrimary} style:--on-secondary={onSecondary}
      style:--on-error={onError} style:--on-background={onBackground} style:--on-surface={onSurface}

      style:--primary-light1={mix(norm(c, primary), norm(c, surface), 0.05)}
      style:--primary-light2={mix(norm(c, primary), norm(c, surface), 0.10)}
      style:--primary-light3={mix(norm(c, primary), norm(c, surface), 0.15)}
      style:--primary-light4={mix(norm(c, primary), norm(c, surface), 0.20)}
      style:--primary-light5={mix(norm(c, primary), norm(c, surface), 0.25)}
      style:--primary-light6={mix(norm(c, primary), norm(c, surface), 0.30)}

      style:--secondary-light1={mix(norm(c, secondary), norm(c, surface), 0.05)}
      style:--secondary-light2={mix(norm(c, secondary), norm(c, surface), 0.10)}
      style:--secondary-light3={mix(norm(c, secondary), norm(c, surface), 0.15)}
      style:--secondary-light4={mix(norm(c, secondary), norm(c, surface), 0.20)}
      style:--secondary-light5={mix(norm(c, secondary), norm(c, surface), 0.25)}
      style:--secondary-light6={mix(norm(c, secondary), norm(c, surface), 0.30)}
>
    <slot/>
</main>
<canvas bind:this={c}></canvas>
