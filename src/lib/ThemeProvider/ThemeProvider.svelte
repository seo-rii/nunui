<script lang="ts">
    import Color from "colorjs.io";

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

    function norm(str) {
        return new Color(str);
    }

    function mix(colorA, colorB, amount) {
        if (!colorA || !colorB) return;
        return colorB.clone().mix(colorA, amount).toString();
    }
</script>

<main style:--primary={primary} style:--secondary={secondary} style:--error={error} style:--background={background}
      style:--surface={surface} style:--on-primary={onPrimary} style:--on-secondary={onSecondary}
      style:--on-error={onError} style:--on-background={onBackground} style:--on-surface={onSurface}
      style:--rop="0.3" style:--bop="0.2" style:--weight="300"

      style:--primary-light1={mix(norm(primary), norm(surface), 0.05)}
      style:--primary-light2={mix(norm(primary), norm(surface), 0.10)}
      style:--primary-light3={mix(norm(primary), norm(surface), 0.15)}
      style:--primary-light4={mix(norm(primary), norm(surface), 0.20)}
      style:--primary-light5={mix(norm(primary), norm(surface), 0.25)}
      style:--primary-light6={mix(norm(primary), norm(surface), 0.30)}
      style:--primary-light7={mix(norm(primary), norm(surface), 0.35)}
      style:--primary-light8={mix(norm(primary), norm(surface), 0.40)}
      style:--primary-light9={mix(norm(primary), norm(surface), 0.45)}
      style:--primary-light10={mix(norm(primary), norm(surface), 0.50)}
      style:--primary-light11={mix(norm(primary), norm(surface), 0.55)}
      style:--primary-light12={mix(norm(primary), norm(surface), 0.60)}
      style:--primary-light13={mix(norm(primary), norm(surface), 0.65)}
      style:--primary-light14={mix(norm(primary), norm(surface), 0.70)}
      style:--primary-light15={mix(norm(primary), norm(surface), 0.75)}
      style:--primary-light16={mix(norm(primary), norm(surface), 0.80)}
      style:--primary-light17={mix(norm(primary), norm(surface), 0.85)}
      style:--primary-light18={mix(norm(primary), norm(surface), 0.90)}
      style:--primary-light19={mix(norm(primary), norm(surface), 0.95)}

      style:--primary-dark1={mix(norm(primary), norm(onSurface), 0.05)}
      style:--primary-dark2={mix(norm(primary), norm(onSurface), 0.10)}
      style:--primary-dark3={mix(norm(primary), norm(onSurface), 0.15)}
      style:--primary-dark4={mix(norm(primary), norm(onSurface), 0.20)}
      style:--primary-dark5={mix(norm(primary), norm(onSurface), 0.25)}
      style:--primary-dark6={mix(norm(primary), norm(onSurface), 0.30)}
      style:--primary-dark7={mix(norm(primary), norm(onSurface), 0.35)}
      style:--primary-dark8={mix(norm(primary), norm(onSurface), 0.40)}
      style:--primary-dark9={mix(norm(primary), norm(onSurface), 0.45)}
      style:--primary-dark10={mix(norm(primary), norm(onSurface), 0.50)}
      style:--primary-dark11={mix(norm(primary), norm(onSurface), 0.55)}
      style:--primary-dark12={mix(norm(primary), norm(onSurface), 0.60)}
      style:--primary-dark13={mix(norm(primary), norm(onSurface), 0.65)}
      style:--primary-dark14={mix(norm(primary), norm(onSurface), 0.70)}
      style:--primary-dark15={mix(norm(primary), norm(onSurface), 0.75)}
      style:--primary-dark16={mix(norm(primary), norm(onSurface), 0.80)}
      style:--primary-dark17={mix(norm(primary), norm(onSurface), 0.85)}
      style:--primary-dark18={mix(norm(primary), norm(onSurface), 0.90)}
      style:--primary-dark19={mix(norm(primary), norm(onSurface), 0.95)}

      style:--secondary-light1={mix(norm(secondary), norm(surface), 0.05)}
      style:--secondary-light2={mix(norm(secondary), norm(surface), 0.10)}
      style:--secondary-light3={mix(norm(secondary), norm(surface), 0.15)}
      style:--secondary-light4={mix(norm(secondary), norm(surface), 0.20)}
      style:--secondary-light5={mix(norm(secondary), norm(surface), 0.25)}
      style:--secondary-light6={mix(norm(secondary), norm(surface), 0.30)}
      style:--secondary-light7={mix(norm(secondary), norm(surface), 0.35)}
      style:--secondary-light8={mix(norm(secondary), norm(surface), 0.40)}
      style:--secondary-light9={mix(norm(secondary), norm(surface), 0.45)}
      style:--secondary-light10={mix(norm(secondary), norm(surface), 0.50)}
      style:--secondary-light11={mix(norm(secondary), norm(surface), 0.55)}
      style:--secondary-light12={mix(norm(secondary), norm(surface), 0.60)}
      style:--secondary-light13={mix(norm(secondary), norm(surface), 0.65)}
      style:--secondary-light14={mix(norm(secondary), norm(surface), 0.70)}
      style:--secondary-light15={mix(norm(secondary), norm(surface), 0.75)}
      style:--secondary-light16={mix(norm(secondary), norm(surface), 0.80)}
      style:--secondary-light17={mix(norm(secondary), norm(surface), 0.85)}
      style:--secondary-light18={mix(norm(secondary), norm(surface), 0.90)}
      style:--secondary-light19={mix(norm(secondary), norm(surface), 0.95)}

      style:--secondary-dark1={mix(norm(secondary), norm(onSurface), 0.05)}
      style:--secondary-dark2={mix(norm(secondary), norm(onSurface), 0.10)}
      style:--secondary-dark3={mix(norm(secondary), norm(onSurface), 0.15)}
      style:--secondary-dark4={mix(norm(secondary), norm(onSurface), 0.20)}
      style:--secondary-dark5={mix(norm(secondary), norm(onSurface), 0.25)}
      style:--secondary-dark6={mix(norm(secondary), norm(onSurface), 0.30)}
      style:--secondary-dark7={mix(norm(secondary), norm(onSurface), 0.35)}
      style:--secondary-dark8={mix(norm(secondary), norm(onSurface), 0.40)}
      style:--secondary-dark9={mix(norm(secondary), norm(onSurface), 0.45)}
      style:--secondary-dark10={mix(norm(secondary), norm(onSurface), 0.50)}
      style:--secondary-dark11={mix(norm(secondary), norm(onSurface), 0.55)}
      style:--secondary-dark12={mix(norm(secondary), norm(onSurface), 0.60)}
      style:--secondary-dark13={mix(norm(secondary), norm(onSurface), 0.65)}
      style:--secondary-dark14={mix(norm(secondary), norm(onSurface), 0.70)}
      style:--secondary-dark15={mix(norm(secondary), norm(onSurface), 0.75)}
      style:--secondary-dark16={mix(norm(secondary), norm(onSurface), 0.80)}
      style:--secondary-dark17={mix(norm(secondary), norm(onSurface), 0.85)}
      style:--secondary-dark18={mix(norm(secondary), norm(onSurface), 0.90)}
      style:--secondary-dark19={mix(norm(secondary), norm(onSurface), 0.95)}

      style:--on-surface-light1={mix(norm(onSurface), norm(surface), 0.05)}
      style:--on-surface-light2={mix(norm(onSurface), norm(surface), 0.10)}
      style:--on-surface-light3={mix(norm(onSurface), norm(surface), 0.15)}
      style:--on-surface-light4={mix(norm(onSurface), norm(surface), 0.20)}
      style:--on-surface-light5={mix(norm(onSurface), norm(surface), 0.25)}
      style:--on-surface-light6={mix(norm(onSurface), norm(surface), 0.30)}>
    <slot/>
</main>
