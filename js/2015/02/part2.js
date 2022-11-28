module.exports = (lines) => {
	const matcher = /(\d+)x(\d+)x(\d+)/;

	const input = lines.split('\n').map((line) => {
		let [, l, w, h] = line.match(matcher);

		return { l: parseInt(l), w: parseInt(w), h: parseInt(h) };
	});
	let ribbon = 0;

	input.forEach((pkg) => {
		let max = Math.max(pkg.l, pkg.w, pkg.h);
		let smallest = 2 * (pkg.l + pkg.w + pkg.h - max);
		let volume = pkg.l * pkg.w * pkg.h;

		ribbon += smallest + volume;
	});

	return ribbon;
};
