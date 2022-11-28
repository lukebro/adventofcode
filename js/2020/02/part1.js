module.exports = (lines) => {
	const matcher = /(\d+)-(\d+) (.): (.*)/;
	const input = lines.split('\n').map((line) => {
		let [, min, max, char, password] = line.match(matcher);

		return { min: parseInt(min), max: parseInt(max), char, password };
	});

	let valid = input.filter((p) => {
		let count = (p.password.match(new RegExp(p.char, 'g')) || []).length;

		return count >= p.min && count <= p.max;
	});

	return valid.length;
};
