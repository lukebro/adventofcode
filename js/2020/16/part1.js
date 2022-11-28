const { findall } = require('@lib/utils');

module.exports = (file) => {
	let [rules, mine, nearby] = file.split('\n\n');

	rules = rules
		.split('\n')
		.map((rule) => findall(/(\d+)-(\d+) or (\d+)-(\d+)/g, rule).map(Number));

	let range = [];

	const markRange = (from, to) => {
		for (let i = from; i <= to; i++) {
			range[i] = true;
		}
	};

	for (let rule of rules) {
		let [min1, max1, min2, max2] = rule;

		markRange(min1, max1);
		markRange(min2, max2);
	}

	nearby = nearby
		.replace('nearby tickets:\n', '')
		.split('\n')
		.map((l) => l.split(','))
		.flat()
		.map(Number);
	let error = 0;

	for (let n of nearby) {
		if (!range[n]) {
			error += n;
		}
	}

	return error;
};
