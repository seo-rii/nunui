export default function(size: number) {
  return (a: number, b: number) => {
    return (t: number) => {
      const r = a * (1 - t) + b * t;
      console.log(Math.round(r / size) * size)
      return Math.round(r / size) * size;
    };
  };
}
