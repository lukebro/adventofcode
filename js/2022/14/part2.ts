import { Coord, drawLine } from './part1';

export default (input: string) => {
	const lines = input
		.split('\n')
		.map((line) =>
			line
				.split(' -> ')
				.map((x) => x.split(',').map((y) => parseInt(y, 10)) as Coord),
		);

	const world = new Set<string>();

	let maxY = 0;

	for (const coords of lines) {
		for (let i = 0; i < coords.length; i++) {
			const coord = coords[i];
			maxY = Math.max(maxY, coord[1]);

			if (!coords[i + 1]) {
				break;
			}

			const next = coords[i + 1];

			drawLine(world, coord, next);
		}
	}

	let count = 0;
	while (simulateSand(world, [500, 0], maxY)) {
		count += 1;
	}

	return count;
};

function simulateSand(world: Set<string>, start: Coord, maxY: number) {
	const current = [...start];

	while (true) {
		if (current[1] === maxY + 1) {
			world.add(`${current[0]},${current[1]}`);
			break;
		}

		const below = `${current[0]},${current[1] + 1}`;

		if (!world.has(below)) {
			current[1] += 1;
			continue;
		}

		const left = `${current[0] - 1},${current[1] + 1}`;

		if (!world.has(left)) {
			current[0] -= 1;
			current[1] += 1;
			continue;
		}

		const right = `${current[0] + 1},${current[1] + 1}`;

		if (!world.has(right)) {
			current[0] += 1;
			current[1] += 1;
			continue;
		}

		const next = `${current[0]},${current[1]}`;
		if (world.has(next)) {
			return false;
		}

		world.add(next);
		break;
	}

	return true;
}
