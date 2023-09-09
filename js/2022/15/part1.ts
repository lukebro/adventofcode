import { findall, manhattan } from '@lib/utils';

const LINE = 2000000;

export default (input: string) => {
	const lines = input.split('\n').map((line) => {
		const [x1, y1, x2, y2] = findall(
			/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/g,
			line,
		).map((n) => parseInt(n, 10));

		const distance = manhattan([x1, y1], [x2, y2]);

		return [x1, y1, distance];
	});

	const map = new Map();

	for (const line of lines) {
		const [x, y, distance] = line;

		// anything above or below the line is not interesting
		if (LINE < y - distance || LINE > y + distance) {
			continue;
		}

		// this is our offset
		const diff = Math.abs(LINE - y);

		// this is our wing span from the center of the line
		const width = distance - diff;

		for (let x1 = x - width; x1 < x + width; ++x1) {
			map.set(`${x1},${LINE}`, 1);
		}
	}

	return map.size;
};
