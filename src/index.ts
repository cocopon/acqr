import * as Commander from 'commander';

import * as Encoder from './encoder';

export function main() {
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

			await Encoder.encode({
				input: input,
				title: opts.title,
				author: opts.author,
				town: opts.town,
				output: opts.output,
			});
		})
		.parse(process.argv);
}
