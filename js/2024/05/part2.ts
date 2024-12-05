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

	function solve(update: number[]): [number, number] | void {
		const seen = [];
		for (let i = 0; i < update.length; ++i) {
			const value = update[i];
			const rules = lookup.get(value) || [];

			for (const rule of rules) {
				const idx = seen.indexOf(rule);
				if (idx > -1) {
					return [i, idx];
				}
			}

			seen.push(value);
		}

		return;
	}

	let page = 0;

	for (let update of updates) {
		let next = solve(update);
		const invalid = Boolean(next);

		while (next) {
			const [i, idx] = next;

			const value = update.splice(idx, 1)[0];
			update.splice(i, 0, value);

			next = solve(update);
		}

		if (invalid) {
			page += update[Math.floor(update.length / 2)];
		}
	}

	return page;
};
