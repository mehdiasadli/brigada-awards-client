export function formatNumber(num: number) {
  const fixed = num.toFixed(2);

  if (fixed.endsWith('.00') || fixed.endsWith('.0')) {
    return fixed.split('.')[0];
  }

  if (fixed.endsWith('0')) {
    return fixed.slice(0, -1);
  }

  return fixed;
}
