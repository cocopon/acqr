import {assert} from 'chai';
import {describe, it} from 'mocha';

import * as RgbaColor from './rgba';

describe('RgbaColor', () => {
	[{
		comps: [0x00, 0x00, 0x00, 0x00],
		hex: 0x00000000,
	}, {
		comps: [0x12, 0x34, 0x56, 0x78],
		hex: 0x12345678,
	}, {
		comps: [0xff, 0xff, 0xff, 0xff],
		hex: 0xffffffff,
	}].forEach(({comps, hex}) => {
		it(`should convert hex ${hex.toString(16)} into components ${JSON.stringify(comps)}`, () => {
			assert.deepEqual(
				RgbaColor.componentsFromHex(hex),
				comps,
			);
		});

		it(`should convert components ${JSON.stringify(comps)} into hex ${hex.toString(16)}`, () => {
			assert.strictEqual(
				RgbaColor.hexFromComponents(comps as RgbaColor.Components),
				hex,
			);
		});
	});
});