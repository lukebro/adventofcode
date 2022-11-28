function isXmas(numbers, next) {
	for (let i = 0; i < numbers.length; i++) {
		let low = numbers[i];

		for (let j = numbers.length - 1; j > i; j--) {
			let hi = numbers[j];

			if (hi + low === next) {
				return true;
			}
		}
	}

	return false;
}

module.exports = (file) => {
	let n = file.split('\n').map(Number);
	let weakness;

	for (let i = 0; i < n.length - 25; i += 1) {
		let code = n.slice(i, i + 25);
		let test = n[i + 25];

		if (!isXmas(code, test)) {
			weakness = test;
			break;
		}
	}

	if (!weakness) {
		return 'no weakness';
	}

	// space in our range
	// when space = 1; [1, 1, 0, 0, 0] -> [0, 1, 1, 0, 0]
	// when space = 2; [1, 1, 1, 0, 0] -> [0, 1, 1, 1, 0]
	let space = 1;

	while (space < n.length) {
		for (let i = 0; i < n.length - space; i++) {
			// adding one because it's 2nd param is exclusive
			let range = n.slice(i, i + space + 1);

			let sum = range.reduce((a, b) => a + b);

			if (sum === weakness) {
				// the list is sorted :facepalm:
				range = range.sort((a, b) => a - b);

				return range[0] + range[range.length - 1];
			}
		}

		space += 1;
	}

	return 'did not find answer';
};
