function encodeText(data: Uint8ClampedArray, ptr: number, text: string, maxLength: number, postfix: number[]) {
	let p = ptr;
	for (let i = 0; i < maxLength; i++) {
		const code = text.charCodeAt(i) || 0;
		data[p++] = (code & 0x00ff);
		data[p++] = (code & 0xff00) >>> 8;
	}
	postfix.forEach((b) => {
		data[p++] = b;
	});
	return p;
}

export function encode(
	params: {
		author: string;
		title: string;
		town: string;
		palette: number[];
		image: number[];
	},
): Uint8ClampedArray {
	const data = new Uint8ClampedArray(620);
	let p = 0;

	// Title
	p = encodeText(
		data, p,
		params.title,
		20,
		// ???
		[0x00, 0x00, 0x00, 0x80],
	);

	// Author
	p = encodeText(
		data, p,
		params.author,
		9,
		// Author ID?
		[0x00, 0x00, 0x00, 0x80],
	);

	// Town
	p = encodeText(
		data, p,
		params.town,
		9,
		// Town ID?
		[0x00, 0x00, 0x00, 0x80],
	);

	// Color palette
	params.palette.forEach((id) => {
		data[p++] = id;
	});

	// Misc
	[
		// ???
		0x00, 0x00,
		// Type
		// 0x09: Normal
		0x09,
		// 0x0000
		0x00, 0x00,
	].forEach((b) => {
		data[p++] = b;
	});

	// Image
	for (let i = 0; i < params.image.length; i += 2) {
		const d1 = params.image[i];
		const d2 = params.image[i + 1] || 0;
		data[p++] =
			((d2 & 0x0f) << 4) |
			(d1 & 0x0f);
	}

	return data;
}
