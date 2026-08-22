declare module "dotted-map" {
  interface DottedMapOptions {
    height?: number;
    grid?: string;
    countries?: string[];
    region?: {
      lat: { min: number; max: number };
      lng: { min: number; max: number };
    };
  }

  interface SVGOptions {
    radius?: number;
    color?: string;
    shape?: "circle" | "hexagon";
    backgroundColor?: string;
  }

  export default class DottedMap {
    constructor(options?: DottedMapOptions);
    getSVG(options: SVGOptions): string;
    addPin(options: { lat: number; lng: number; svgOptions?: SVGOptions }): void;
  }
}
