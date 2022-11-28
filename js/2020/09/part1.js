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

	for (let i = 0; i < n.length - 25; i += 1) {
		let code = n.slice(i, i + 25);
		let test = n[i + 25];

		if (!isXmas(code, test)) return test;
	}

	return 'did not find the answer';
};
