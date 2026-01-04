import ColorThief from 'colorthief';

/**
 * Color extraction result
 */
export interface ExtractedColor {
  rgb: [number, number, number];
  hex: string;
}

/**
 * Cache for extracted colors to avoid repeated image processing
 */
const colorCache = new Map<string, ExtractedColor | null>();

/**
 * Convert RGB array to hex string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate perceived brightness of a color (0-255)
 */
export function getColorBrightness(r: number, g: number, b: number): number {
  // Use perceived luminance formula
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

/**
 * Determine if a color is light (needs dark text) or dark (needs light text)
 */
export function isLightColor(r: number, g: number, b: number): boolean {
  return getColorBrightness(r, g, b) > 150;
}

/**
 * Get appropriate foreground color for a background
 */
export function getForegroundColor(r: number, g: number, b: number): string {
  return isLightColor(r, g, b) ? '#1a1a1a' : '#ffffff';
}

/**
 * Extract the dominant color from an image URL using ColorThief
 * Returns null if extraction fails
 */
export function extractColorFromImage(imageUrl: string): Promise<ExtractedColor | null> {
  // Check cache first
  if (colorCache.has(imageUrl)) {
    return Promise.resolve(colorCache.get(imageUrl) ?? null);
  }

  return new Promise((resolve) => {
    // Skip if no image URL
    if (!imageUrl) {
      colorCache.set(imageUrl, null);
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);

        if (dominantColor && Array.isArray(dominantColor) && dominantColor.length >= 3) {
          const result: ExtractedColor = {
            rgb: [dominantColor[0], dominantColor[1], dominantColor[2]],
            hex: rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]),
          };
          colorCache.set(imageUrl, result);
          resolve(result);
        } else {
          colorCache.set(imageUrl, null);
          resolve(null);
        }
      } catch (error) {
        console.warn('ColorThief extraction failed:', error);
        colorCache.set(imageUrl, null);
        resolve(null);
      }
    };

    img.onerror = () => {
      console.warn('Failed to load image for color extraction:', imageUrl);
      colorCache.set(imageUrl, null);
      resolve(null);
    };

    // Set source to trigger load
    img.src = imageUrl;
  });
}

/**
 * Clear the color cache (useful when scenes are refreshed)
 */
export function clearColorCache(): void {
  colorCache.clear();
}

/**
 * Get a color palette from an image (multiple dominant colors)
 */
export function extractPaletteFromImage(imageUrl: string, colorCount: number = 5): Promise<ExtractedColor[] | null> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, colorCount);

        if (palette && Array.isArray(palette)) {
          const results: ExtractedColor[] = palette.map((color: number[]) => ({
            rgb: [color[0], color[1], color[2]] as [number, number, number],
            hex: rgbToHex(color[0], color[1], color[2]),
          }));
          resolve(results);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.warn('ColorThief palette extraction failed:', error);
        resolve(null);
      }
    };

    img.onerror = () => {
      resolve(null);
    };

    img.src = imageUrl;
  });
}
