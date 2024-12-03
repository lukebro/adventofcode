import { findall } from '../../lib/utils';

export default (input: string) => {
	const all = findall(/mul\((\d+),(\d+)\)/g, input).map((result) =>
		result.map(Number),
	);

	let total = 0;

	for (const [a, b] of all) {
		total += a * b;
	}

	return total;
};
