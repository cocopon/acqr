export type Components = [number, number, number, number];
export type Hex = number;

export const HEX_TRANSPARENT = 0x00000000;

export function componentsFromHex(hex: number): Components {
	return [
		(hex & 0xff000000) >>> 24,
		(hex & 0x00ff0000) >>> 16,
		(hex & 0x0000ff00) >>>  8,
		(hex & 0x000000ff),
	];
}

export function hexFromComponents(comps: Components): Hex {
	return (
		((comps[0] & 0xff) << 24) |
		((comps[1] & 0xff) << 16) |
		((comps[2] & 0xff) <<  8) |
		((comps[3] & 0xff))
	) >>> 0;
}
