import {assert} from 'chai';
import {describe, it} from 'mocha';

import * as SystemColors from './system-colors';

describe('SystemColors', () => {
	[{
		expected: {
			colorId: 0xef,
		},
		params: {
			hex: 0x000000,
		},
	}, {
		expected: {
			colorId: 0x0f,
		},
		params: {
			hex: 0xffffff,
		},
	}, {
		expected: {
			colorId: 0x24,
		},
		params: {
			hex: 0xff6600,
		},
	}, {
		expected: {
			colorId: 0x42,
		},
		params: {
			hex: 0xc060d0,
		},
	}, {
		expected: {
			colorId: 0x96,
		},
		params: {
			hex: 0x0000cc,
		},
	}, {
		expected: {
			colorId: 0x94,
		},
		params: {
			hex: 0x0000dd,
		},
	}].forEach(({expected, params}) => {
		it(`should return color #${expected.colorId.toString(16)} for color ${params?.hex.toString(16)}`, () => {
			assert.strictEqual(
				SystemColors.getNearestColorId(params.hex),
				expected.colorId,
			);
		});
	});
});