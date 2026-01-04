import { HassEntity } from '../types';

/**
 * Convert HSL to Hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convert HS (Hue, Saturation from HA) to Hex
 * HA uses hue 0-360, saturation 0-100
 */
export function hsToHex(hue: number, saturation: number): string {
  return hslToHex(hue, saturation, 50);
}

/**
 * Convert RGB array to Hex
 */
export function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Determine if a color is "light" or "dark"
 * Useful for choosing text color on colored backgrounds
 */
export function isLightColor(hex: string): boolean {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Get current color from a light entity state
 * Used to reflect active scene color on the light row
 */
export function getLightCurrentColor(state: HassEntity): string | null {
  const attrs = state.attributes;

  // RGB color takes priority
  if (attrs.rgb_color) {
    return rgbToHex(attrs.rgb_color);
  }

  // Convert HS color if available
  if (attrs.hs_color) {
    return hsToHex(attrs.hs_color[0], attrs.hs_color[1]);
  }

  // Color temp - map to warm/cool white
  if (attrs.color_temp) {
    const temp = attrs.color_temp;
    if (temp < 250) return '#F5F5FF';      // Cool white
    if (temp < 350) return '#FFFAF0';      // Neutral
    return '#FFE4B5';                       // Warm white
  }

  return null;
}

/**
 * Parse a hex color to RGB components
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

/**
 * Blend two colors together
 */
export function blendColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1[0] * (1 - ratio) + rgb2[0] * ratio);
  const g = Math.round(rgb1[1] * (1 - ratio) + rgb2[1] * ratio);
  const b = Math.round(rgb1[2] * (1 - ratio) + rgb2[2] * ratio);

  return rgbToHex([r, g, b]);
}

/**
 * Get default color for a light that is on (warm amber)
 */
export function getDefaultOnColor(): string {
  return '#FBBF24';
}

/**
 * Adjust color brightness
 */
export function adjustColorBrightness(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const r = Math.min(255, Math.round(rgb[0] * factor));
  const g = Math.min(255, Math.round(rgb[1] * factor));
  const b = Math.min(255, Math.round(rgb[2] * factor));

  return rgbToHex([r, g, b]);
}
