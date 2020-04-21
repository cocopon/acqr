import * as Quantize from 'quantize';

import * as RgbColor from '../color/rgb-color';
import * as RgbaColor from '../color/rgba-color';

type ColorIndex = number;

const COLOR_INDEX_TRANSPARENT = 0xf;

interface QuantizationResult {
	image: ColorIndex[];
	palette: RgbColor.Hex[];
}

function isOpaque(alpha: number): boolean {
	return alpha > 0;
}

function extractOpaqueColors(rgbaHexes: RgbaColor.Hex[]): RgbColor.Hex[] {
	const opaqueHexes = rgbaHexes.filter((rgbaHex) => {
		const comps = RgbaColor.hexToComponents(rgbaHex);
		return isOpaque(comps[3]);
	});
	return opaqueHexes.map((rgbaHex) => {
		const comps = RgbaColor.hexToComponents(rgbaHex);
		return RgbColor.componentsToHex([
			comps[0],
			comps[1],
			comps[2],
		]);
	});
}

function getNearestColorIndex(colMap: any, palette: RgbColor.Components[], rgbComps: RgbColor.Components): ColorIndex | null {
	const comps = colMap.map(rgbComps);
	let minDist = Number.MAX_VALUE;
	let result = null;

	palette.forEach((palComps, id) => {
		const dist = RgbColor.getDistance(comps, palComps);
		if (dist < minDist) {
			result = id;
			minDist = dist;
		}
	});

	return result;
}

export function quantize(rgbaHexes: RgbaColor.Hex[]): QuantizationResult {
	// Quantize
	const opaqueHexes = extractOpaqueColors(rgbaHexes);
	const colMap = Quantize(
		opaqueHexes.map(RgbColor.hexToComponents),
		16,
	);

	// Convert pixels into color indexes
	const palette: RgbColor.Components[] = colMap.palette();
	const colIndexes = rgbaHexes.map((rgbaHex) => {
		const rgbaComps = RgbaColor.hexToComponents(rgbaHex);
		const rgbComps: RgbColor.Components = [
			rgbaComps[0],
			rgbaComps[1],
			rgbaComps[2],
		];

		if (!isOpaque(rgbaComps[3])) {
			return COLOR_INDEX_TRANSPARENT;
		}

		return getNearestColorIndex(colMap, palette, rgbComps) || 0;
	});

	return {
		image: colIndexes,
		palette: palette.map(RgbColor.componentsToHex),
	};
}
