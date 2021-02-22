export default function mergeClassNames(...classNames) {
  return classNames
    .filter((c) => c && c.trim)
    .map((c) => c.trim())
    .join(' ')
    .trim();
}
