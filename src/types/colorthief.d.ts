declare module 'colorthief' {
  export default class ColorThief {
    /**
     * Get the dominant color from an image
     * @param sourceImage - HTML image element, canvas, or image path
     * @param quality - Quality 1-10 (1 is highest quality but slowest)
     * @returns RGB array [r, g, b]
     */
    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement, quality?: number): [number, number, number] | null;

    /**
     * Get a palette of colors from an image
     * @param sourceImage - HTML image element, canvas, or image path
     * @param colorCount - Number of colors to get (default 10)
     * @param quality - Quality 1-10 (1 is highest quality but slowest)
     * @returns Array of RGB arrays
     */
    getPalette(
      sourceImage: HTMLImageElement | HTMLCanvasElement,
      colorCount?: number,
      quality?: number
    ): Array<[number, number, number]> | null;
  }
}
