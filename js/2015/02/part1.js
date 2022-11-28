// 2*l*w + 2*w*h + 2*h*l
module.exports = (lines) => {
	const matcher = /(\d+)x(\d+)x(\d+)/;
	const input = lines.split('\n').map((line) => {
		let [, l, w, h] = line.match(matcher);

		return { l: parseInt(l), w: parseInt(w), h: parseInt(h) };
	});

	let sqft = 0;

	input.forEach((pkg) => {
		let lw = pkg.l * pkg.w;
		let wh = pkg.w * pkg.h;
		let hl = pkg.h * pkg.l;

		sqft += 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
	});

	return sqft;
};
