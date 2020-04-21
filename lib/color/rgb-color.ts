export type Components = [number, number, number];
export type Hex = number;

export function hexToComponents(hex: number): Components {
	return [
		(hex & 0xff0000) >>> 16,
		(hex & 0x00ff00) >>>  8,
		(hex & 0x0000ff),
	];
}

export function componentsToHex(comps: Components): Hex {
	return (
		((comps[0] & 0xff) << 16) |
		((comps[1] & 0xff) << 8)  |
		((comps[2] & 0xff))
	) >>> 0;
}

export function getDistance(comps1: Components, comps2: Components): number {
	return Math.sqrt([0, 1, 2].reduce((total, index) => {
		return total + Math.pow(comps1[index] - comps2[index], 2);
	}, 0));
}
