import * as Jimp from 'jimp';

import * as RgbaColor from '../color/rgba-color';

const IMAGE_SIZE = 32;

export async function read(path: string): Promise<RgbaColor.Hex[]> {
	const img = await Jimp.read(path);
	img.resize(
		IMAGE_SIZE, IMAGE_SIZE,
		Jimp.RESIZE_NEAREST_NEIGHBOR,
	);

	const rgbaHexes: RgbaColor.Hex[] = [];
	for (let y = 0; y < IMAGE_SIZE; y++) {
		for (let x = 0; x < IMAGE_SIZE; x++) {
			rgbaHexes.push(img.getPixelColor(x, y));
		}
	}
	return rgbaHexes;
}

export async function write(path: string, rgbaHexes: RgbaColor.Hex[]) {
	const img = await new Jimp(IMAGE_SIZE, IMAGE_SIZE);
	for (let y = 0; y < IMAGE_SIZE; y++) {
		for (let x = 0; x < IMAGE_SIZE; x++) {
			img.setPixelColor(rgbaHexes[y * IMAGE_SIZE + x], x, y);
		}
	}
	await img.write(path);
}