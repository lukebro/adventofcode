// More efficient solution for part 2, solve the ordering in place.

export default (input: string) => {
	const [one, two] = input.split('\n\n');

	const rules = one.split('\n').map((rule) => rule.split('|').map(Number));
	const updates = two.split('\n').map((rule) => rule.split(',').map(Number));

	const lookup = new Map<number, number[]>();

	for (const [x, y] of rules) {
		const value = lookup.get(x) || [];
		value.push(y);
		lookup.set(x, value);
	}

	function solve(update: number[]) {
		let didWork = false;
		const seen = [];

		for (let i = 0; i < update.length; ++i) {
			const value = update[i];
			const rules = lookup.get(value) || [];

			for (const rule of rules) {
				const idx = seen.indexOf(rule);

				if (idx > -1) {
					didWork = true;
					update.splice(i, 1);
					update.splice(idx, 0, value);
					i = -1;
					seen.length = 0;
					break;
				}
			}

			if (i === -1) {
				continue;
			}

			seen.push(value);
		}

		return didWork;
	}

	let page = 0;

	for (let update of updates) {
		if (solve(update)) {
			page += update[Math.floor(update.length / 2)];
		}
	}

	return page;
};
