export function getTextColorForContrast(hexColor: string) {
  // Remove leading "#" symbol if present
  const color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

  // Convert hex to RGB values (assumes valid hex format)
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  // Calculate relative luminance (YIQ luminosity formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose black or white based on a threshold (adjust 0.5 as needed)
  const textColor = luminance > 0.75 ? "black" : "white";
  return textColor;
}
