import * as Qrcode from 'qrcode';

import * as AcQr from './ac/qr';
import * as AcSystemColors from './ac/system-colors';
import * as Quantizer from './image/quantizer';
import * as ImageReader from './image/reader';

export async function encode(params: {
	input: string;
	title: string;
	author: string;
	town: string;
	output: string;
}) {
	const rgbaHexes = await ImageReader.read(params.input);
	const quant = Quantizer.quantize(rgbaHexes);
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