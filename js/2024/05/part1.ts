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

	let page = 0;

	for (const update of updates) {
		let seen: number[] = [];

		let good = true;

		for (let i = 0; i < update.length; ++i) {
			const value = update[i];
			const rules = lookup.get(value) || [];

			for (const rule of rules) {
				if (seen.includes(rule)) {
					good = false;
					break;
				}
			}

			if (!good) {
				break;
			}

			seen.push(value);
		}

		if (good) {
			page += update[Math.floor(update.length / 2)];
		}
	}

	return page;
};
