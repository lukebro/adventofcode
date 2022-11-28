import { findall } from '@lib/utils';

export default (file: string) => {
	const [part1, part2] = file.split('\n\n');

	const polymer: string[] = part1.split('');

	const pairInsertion: Map<string, string> = part2
		.split('\n')
		.reduce((map, line) => {
			const [left, right]: string[] = findall(/([A-Z]+) -> ([A-Z])/g, line);

			map.set(left, right);

			return map;
		}, new Map() as Map<string, string>);

	const inc = (
		map: Map<string, number>,
		key: string,
		amount: number = 1,
	): void => {
		if (map.has(key)) {
			map.set(key, map.get(key) + amount);
		} else {
			map.set(key, amount);
		}
	};

	const step = (map: Map<string, number>): Map<string, number> => {
		const nextMap = new Map();

		for (const [pair, count] of map) {
			if (pairInsertion.has(pair)) {
				const next = pairInsertion.get(pair);

				inc(nextMap, pair[0] + next, count);
				inc(nextMap, next + pair[1], count);
			} else {
				inc(nextMap, pair, count);
			}
		}

		return nextMap;
	};

	let pairCount: Map<string, number> = new Map();

	for (let i = 0; i < polymer.length - 1; i++) {
		inc(pairCount, polymer[i] + polymer[i + 1]);
	}

	for (let i = 0; i < 40; i++) {
		pairCount = step(pairCount);
	}

	const polymerCount: Map<string, number> = new Map();
	for (let [pair, value] of pairCount) {
		inc(polymerCount, pair[0], value);
	}

	// step1 ABCD -> [AB], [BC], [CD] if we count pair[0] D never gets counted
	// reverse is true of A if we start init loop at i=1
	inc(polymerCount, polymer[polymer.length - 1]);

	const max = Math.max(...polymerCount.values());
	const min = Math.min(...polymerCount.values());

	return max - min;
};
