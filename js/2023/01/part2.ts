const LOOKUP = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

const MIN = '1'.charCodeAt(0);
const MAX = '9'.charCodeAt(0);

export default (input: string) => {
	const lines = input.split('\n');

	let sum = 0;

	for (const line of lines) {
		let first = null;
		let last = null;
		let buffer = '';
		for (let i = 0; i < line.length; i++) {
			const code = line[i].charCodeAt(0);

			if (code >= MIN && code <= MAX) {
				if (first == null) {
					first = line[i];
				}
				last = line[i];
				buffer = '';
			} else {
				buffer += line[i];
			}

			let dupe = buffer;

			while (dupe.length >= 3) {
				const test = LOOKUP.indexOf(dupe);

				if (test > -1) {
					last = test + 1 + '';
					if (first == null) {
						first = last;
					}
					buffer = dupe;
				}

				dupe = dupe.slice(1);
			}
		}

		sum += parseInt(first + last, 10);
	}

	return sum;
};
