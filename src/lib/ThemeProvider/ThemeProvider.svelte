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
      style:--primary-light7={mix(norm(c, primary), norm(c, surface), 0.35)}
      style:--primary-light8={mix(norm(c, primary), norm(c, surface), 0.40)}
      style:--primary-light9={mix(norm(c, primary), norm(c, surface), 0.45)}
      style:--primary-light10={mix(norm(c, primary), norm(c, surface), 0.50)}
      style:--primary-light11={mix(norm(c, primary), norm(c, surface), 0.55)}
      style:--primary-light12={mix(norm(c, primary), norm(c, surface), 0.60)}
      style:--primary-light13={mix(norm(c, primary), norm(c, surface), 0.65)}
      style:--primary-light14={mix(norm(c, primary), norm(c, surface), 0.70)}
      style:--primary-light15={mix(norm(c, primary), norm(c, surface), 0.75)}
      style:--primary-light16={mix(norm(c, primary), norm(c, surface), 0.80)}
      style:--primary-light17={mix(norm(c, primary), norm(c, surface), 0.85)}
      style:--primary-light18={mix(norm(c, primary), norm(c, surface), 0.90)}
      style:--primary-light19={mix(norm(c, primary), norm(c, surface), 0.95)}

      style:--primary-dark1={mix(norm(c, primary), norm(c, onSurface), 0.05)}
      style:--primary-dark2={mix(norm(c, primary), norm(c, onSurface), 0.10)}
      style:--primary-dark3={mix(norm(c, primary), norm(c, onSurface), 0.15)}
      style:--primary-dark4={mix(norm(c, primary), norm(c, onSurface), 0.20)}
      style:--primary-dark5={mix(norm(c, primary), norm(c, onSurface), 0.25)}
      style:--primary-dark6={mix(norm(c, primary), norm(c, onSurface), 0.30)}
      style:--primary-dark7={mix(norm(c, primary), norm(c, onSurface), 0.35)}
      style:--primary-dark8={mix(norm(c, primary), norm(c, onSurface), 0.40)}
      style:--primary-dark9={mix(norm(c, primary), norm(c, onSurface), 0.45)}
      style:--primary-dark10={mix(norm(c, primary), norm(c, onSurface), 0.50)}
      style:--primary-dark11={mix(norm(c, primary), norm(c, onSurface), 0.55)}
      style:--primary-dark12={mix(norm(c, primary), norm(c, onSurface), 0.60)}
      style:--primary-dark13={mix(norm(c, primary), norm(c, onSurface), 0.65)}
      style:--primary-dark14={mix(norm(c, primary), norm(c, onSurface), 0.70)}
      style:--primary-dark15={mix(norm(c, primary), norm(c, onSurface), 0.75)}
      style:--primary-dark16={mix(norm(c, primary), norm(c, onSurface), 0.80)}
      style:--primary-dark17={mix(norm(c, primary), norm(c, onSurface), 0.85)}
      style:--primary-dark18={mix(norm(c, primary), norm(c, onSurface), 0.90)}
      style:--primary-dark19={mix(norm(c, primary), norm(c, onSurface), 0.95)}

      style:--secondary-light1={mix(norm(c, secondary), norm(c, surface), 0.05)}
      style:--secondary-light2={mix(norm(c, secondary), norm(c, surface), 0.10)}
      style:--secondary-light3={mix(norm(c, secondary), norm(c, surface), 0.15)}
      style:--secondary-light4={mix(norm(c, secondary), norm(c, surface), 0.20)}
      style:--secondary-light5={mix(norm(c, secondary), norm(c, surface), 0.25)}
      style:--secondary-light6={mix(norm(c, secondary), norm(c, surface), 0.30)}

      style:--secondary-dark1={mix(norm(c, secondary), norm(c, onSurface), 0.05)}
      style:--secondary-dark2={mix(norm(c, secondary), norm(c, onSurface), 0.10)}
      style:--secondary-dark3={mix(norm(c, secondary), norm(c, onSurface), 0.15)}
      style:--secondary-dark4={mix(norm(c, secondary), norm(c, onSurface), 0.20)}
      style:--secondary-dark5={mix(norm(c, secondary), norm(c, onSurface), 0.25)}
      style:--secondary-dark6={mix(norm(c, secondary), norm(c, onSurface), 0.30)}

      style:--on-surface-light1={mix(norm(c, onSurface), norm(c, surface), 0.05)}
      style:--on-surface-light2={mix(norm(c, onSurface), norm(c, surface), 0.10)}
      style:--on-surface-light3={mix(norm(c, onSurface), norm(c, surface), 0.15)}
      style:--on-surface-light4={mix(norm(c, onSurface), norm(c, surface), 0.20)}
      style:--on-surface-light5={mix(norm(c, onSurface), norm(c, surface), 0.25)}
      style:--on-surface-light6={mix(norm(c, onSurface), norm(c, surface), 0.30)}
>
    <slot/>
</main>
<canvas bind:this={c} style="display: none;"></canvas>
