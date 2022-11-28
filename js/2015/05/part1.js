module.exports = (input) => {
	input = input.split('\n');
	let v = ['a', 'e', 'i', 'o', 'u'];
	let bad = ['ab', 'cd', 'pq', 'xy'];
	let nice = 0;

	for (let str of input) {
		let vowels = [...str].reduce((count, c) => {
			if (v.includes(c)) {
				count++;
			}

			return count;
		}, 0);

		if (vowels < 3) {
			continue;
		}

		let repeated = /([a-z])\1/.test(str);

		if (!repeated) {
			continue;
		}

		let notContain = bad.filter((a) => str.includes(a)).length;

		if (notContain > 0) {
			continue;
		}

		nice++;
	}

	return nice;
};
