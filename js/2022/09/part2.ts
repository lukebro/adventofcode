import { parse, isTouching } from './part1';

export default (file: string) => {
	const moves = parse(file);

	const rope = Array.from({ length: 10 }, () => [0, 0]);
	const record = new Set();

	record.add('0,0');

	for (const move of moves) {
		const [direction, count] = move;

		for (let i = 0; i < count; ++i) {
			simulate(direction, rope);

			record.add(rope[rope.length - 1].join(','));
		}
	}

	return record.size;
};

export function simulate(direction, rope) {
	const head = rope[0];

	if (direction === 'U') {
		head[1] += 1;
	} else if (direction === 'R') {
		head[0] += 1;
	} else if (direction === 'D') {
		head[1] -= 1;
	} else if (direction === 'L') {
		head[0] -= 1;
	}

	for (let i = 1; i < rope.length; ++i) {
		const knot = rope[i];
		const previous = rope[i - 1];

		if (!isTouching(knot, previous)) {
			if (knot[0] !== previous[0]) {
				if (previous[0] > knot[0]) {
					knot[0] += 1;
				} else {
					knot[0] -= 1;
				}
			}

			if (knot[1] !== previous[1]) {
				if (previous[1] > knot[1]) {
					knot[1] += 1;
				} else {
					knot[1] -= 1;
				}
			}
		}
	}
}

export function printRope(rope, maxX, maxY, offsetX = 0, offsetY = 0) {
	const map = new Map();

	rope.forEach((r, i) => {
		const key = r.join(',');

		if (map.has(key)) {
			return;
		}

		map.set(key, i === 0 ? 'H' : `${i}`);
	});

	for (let y = maxY - 1 - offsetY; y >= 0 - offsetY; --y) {
		for (let x = 0 - offsetX; x < maxX - offsetX; ++x) {
			const char = map.get(`${x},${y}`) || '.';
			process.stdout.write(char);
		}

		process.stdout.write('\n');
	}
}
