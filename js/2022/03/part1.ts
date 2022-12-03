export default (file: string) => {
	const lines = file
		.split('\n')
		.map((line) => [
			line.slice(0, line.length / 2),
			line.slice(line.length / 2),
		]);

	const results = [];

	for (const [a, b] of lines) {
		const r = compare(a, b);

		if (r) {
			results.push(r);
		}
	}

	return rank(results);
};

function compare(a: string, b: string) {
	for (let i = 0; i < a.length; ++i) {
		let char = a[i];

		if (b.indexOf(char) > -1) {
			return char;
		}
	}

	return null;
}

function rank(letters) {
	let score = 0;

	for (const letter of letters) {
		const isUpper = letter.toUpperCase() === letter;

		score +=
			letter.charCodeAt(0) -
			`${isUpper ? 'A' : 'a'}`.charCodeAt(0) +
			(isUpper ? 27 : 1);
	}

	return score;
}
