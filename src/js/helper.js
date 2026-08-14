export function getSvgIconUrl(iconFileName, iconId) {
  if (!iconFileName || (typeof iconFileName !== 'string') ||
      !iconId || (typeof iconId !== 'string')) return;

  const spriteUrl = new URL(iconFileName, import.meta.url).href;

  return `${spriteUrl}#${iconId}`;
}
