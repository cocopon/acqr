import * as Qrcode from 'qrcode';

import * as AcQr from './ac/qr';
import * as AcSystemColors from './ac/system-colors';
import * as RgbColor from './color/rgb';
import * as RgbaColor from './color/rgba';
import * as ImageIo from './image/io';
import * as Quantizer from './image/quantizer';

function rgbaHexFromColorIndex(colorIndex: number, quant: Quantizer.Result): RgbaColor.Hex {
	if (colorIndex === Quantizer.COLOR_INDEX_TRANSPARENT) {
		return RgbaColor.HEX_TRANSPARENT;
	}

	const rgbHex = quant.palette[colorIndex];
	const systemHex = AcSystemColors.getColor(
		AcSystemColors.getNearestColorId(rgbHex)
	);
	if (systemHex === null) {
		return RgbaColor.HEX_TRANSPARENT;
	}

	const comps = RgbColor.componentsFromHex(systemHex);
	return RgbaColor.hexFromComponents([
		comps[0],
		comps[1],
		comps[2],
		0xff,
	]);
}

export async function encode(params: {
	input: string;
	title: string;
	author: string;
	town: string;
	output: string;
	preview: string | undefined;
}) {
	const rgbaHexes = await ImageIo.read(params.input);
	const quant = Quantizer.quantize(rgbaHexes);

	if (params.preview) {
		const previewHexes = quant.image.map((colorIndex: number) => {
			return rgbaHexFromColorIndex(colorIndex, quant);
		});
		await ImageIo.write(params.preview, previewHexes);
	}

	const qrData = AcQr.encode({
		title: params.title,
		author: params.author,
		town: params.town,
		palette: quant.palette.map(AcSystemColors.getNearestColorId),
		image: quant.image,
	});
	Qrcode.toFile(
		params.output,
		[{
			data: (qrData as any),
			mode: 'byte',
		}],
	);
}