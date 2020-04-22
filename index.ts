import * as Commander from 'commander';
import * as Qrcode from 'qrcode';

import * as AcQr from './lib/ac/qr';
import * as AcSystemColors from './lib/ac/system-colors';
import * as Quantizer from './lib/image/quantizer';
import * as ImageReader from './lib/image/reader';

async function encode(params: {
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

if (process.argv.length <= 2) {
	Commander.outputHelp();
	process.exit(0);
}

Commander
	.option('-o, --output <path>', undefined, 'out.png')
	.option('-t, --title <value>', undefined, 'Untitled')
	.option('-a, --author <value>', undefined, 'Anonymous')
	.option('--town <value>', '', 'Unknown')
	.action(async (opts) => {
		const input = opts.args[0];
		if (!input) {
			Commander.outputHelp();
			process.exit(0);
		}

		await encode({
			input: input,
			title: opts.title,
			author: opts.author,
			town: opts.town,
			output: opts.output,
		});
	})
	.parse(process.argv);