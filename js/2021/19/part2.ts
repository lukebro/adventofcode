import { solve, parse } from './part1';
import { manhattan } from '@lib/utils';

export default (file: string) => {
	const [, scanners] = solve(parse(file));

	let max = 0;
	for (let i = 0; i < scanners.length; ++i) {
		for (let j = i + 1; j < scanners.length; ++j) {
			max = Math.max(max, manhattan(scanners[i], scanners[j]));
		}
	}

	return max;
};
