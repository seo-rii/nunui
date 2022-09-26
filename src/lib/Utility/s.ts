export default function s(node: HTMLElement, styles: any) {
  const { _ } = styles;
  node.style.cssText = _ + ";" + Object.entries(styles).map(([key, value]) => `--${key}:${value}`).join(";");

  return {
    update(styles: any) {
      const { _ } = styles;
      node.style.cssText = _ + ";" + Object.entries(styles).map(([key, value]) => `--${key}:${value}`).join(";");
    },
    destroy: () => node.style.cssText = ""
  };
}
