import {assert} from 'chai';
import {describe, it} from 'mocha';

import * as RgbColor from './rgb';

describe('RgbColor', () => {
	[{
		comps: [0x00, 0x00, 0x00],
		hex: 0x000000,
	}, {
		comps: [0x12, 0x34, 0x56],
		hex: 0x123456,
	}, {
		comps: [0xff, 0xff, 0xff],
		hex: 0xffffff,
	}].forEach(({comps, hex}) => {
		it(`should convert hex ${hex.toString(16)} into components ${JSON.stringify(comps)}`, () => {
			assert.deepEqual(
				RgbColor.componentsFromHex(hex),
				comps,
			);
		});

		it(`should convert components ${JSON.stringify(comps)} into hex ${hex.toString(16)}`, () => {
			assert.strictEqual(
				RgbColor.hexFromComponents(comps as RgbColor.Components),
				hex,
			);
		});
	});
});