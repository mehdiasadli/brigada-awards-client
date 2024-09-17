export function cropImage(src?: string | null, w = 200) {
  if (!src) return null;
  if (!w) return src;

  const splitter = 'upload/';
  const [beginning, end] = src.split(splitter);

  return `${beginning}${splitter}w_${w}/${end}`;
}
