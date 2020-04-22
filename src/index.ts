import * as Commander from 'commander';

import * as Encoding from './encoding';

export function main() {
	if (process.argv.length <= 2) {
		Commander.outputHelp();
		process.exit(0);
	}

	Commander
		.option('-a, --author <value>', undefined, 'Anonymous')
		.option('-o, --output <path>', undefined, 'out.png')
		.option('-t, --title <value>', undefined, 'Untitled')
		.option('--preview <path>')
		.option('--town <value>', undefined, 'Unknown')
		.action(async (opts) => {
			const input = opts.args[0];
			if (!input) {
				Commander.outputHelp();
				process.exit(0);
			}

			await Encoding.encode({
				input: input,
				title: opts.title,
				author: opts.author,
				town: opts.town,
				output: opts.output,
				preview: opts.preview,
			});
		})
		.parse(process.argv);
}
