export default (file: string) => {
	const lines = file.split('\n');

	const results = [];
	for (let i = 0; i < lines.length; i += 3) {
		const r = compare(lines.slice(i, i + 3));

		if (r) {
			results.push(r);
		}
	}

	return rank(results);
};

export function compare(rucksacks) {
	for (let i = 0; i < rucksacks[0].length; ++i) {
		let matcher = rucksacks[0][i];
		let missing = false;

		for (let i = 1; i < rucksacks.length; ++i) {
			if (rucksacks[i].indexOf(matcher) === -1) {
				missing = true;
				break;
			}
		}

		if (!missing) {
			return matcher;
		}
	}
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
