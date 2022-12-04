import { findall } from '@lib/utils';

export default (file: string) => {
	const input = file.split('\n').map((line) => {
		const [a1, a2, b1, b2] = findall(/(\d+)-(\d+),(\d+)-(\d+)/, line).map(
			Number,
		);

		return [[a1, a2] as Range, [b1, b2] as Range];
	});

	return input.reduce((count, [a, b]) => {
		if (overlap(a, b) || overlap(b, a)) {
			count += 1;
		}

		return count;
	}, 0);
};

type Range = [number, number];

function overlap(a: Range, b: Range) {
	if (b[0] >= a[0] && b[0] <= a[1]) {
		return true;
	}

	if (b[1] >= a[0] && b[1] <= a[1]) {
		return true;
	}

	return false;
}
