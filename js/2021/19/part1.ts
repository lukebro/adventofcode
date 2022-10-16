import { permutations, euclidean } from '@lib/utils';

const OVERLAPPING_BEACONS = 12;
const DIMENSIONS = 3;
const TRANFORMS = permutations([1, -1], { size: DIMENSIONS, repeat: true });
const SHUFFLES = permutations([0, 1, 2]);

type Coord = [number, number, number];

function applyTransform(coords, transform) {
	const result = [...coords];

	for (let i = 0; i < result.length; ++i) {
		result[i] = result[i] * transform[i];
	}

	return result;
}

function applyShuffle(coords, shuffle) {
	const result = [];

	for (let i = 0; i < shuffle.length; ++i) {
		result.push(coords[shuffle[i]]);
	}

	return result;
}

function key(x, y, z) {
	return `${x},${y},${z}`;
}

function add(world, x, y, z) {
	const k = key(x, y, z);

	if (world.has(k)) {
		world.set(k, world.get(k) + 1);
		return;
	}

	world.set(k, 1);
}

function has(world, x, y, z) {
	return world.has(key(x, y, z));
}

function all(world) {
	return [...world.keys()].map((key) => key.split(',').map(Number));
}

function relative(beacon, all) {
	return all.map((current) => {
		return [
			beacon[0] - current[0],
			beacon[1] - current[1],
			beacon[2] - current[2],
		];
	});
}

function fitToWorld(scan, world) {
	const map = all(world);
	let fit = false;
	let fitScan;

	for (const beacon of scan) {
		const relScan = relative(beacon, scan);
		const tRelScan = TRANFORMS.map((transform) =>
			relScan.map((coords) => applyTransform(coords, transform)),
		);

		for (const [x, y, z] of map) {
			for (const t of tRelScan) {
				const shuffled = SHUFFLES.map((shuffle) =>
					t.map((coords) => applyShuffle(coords, shuffle)),
				);

				for (const s of shuffled) {
					let matches = 0;
					for (const [dx, dy, dz] of s) {
						if (has(world, x + dx, y + dy, z + dz)) {
							matches += 1;
						}

						if (matches >= OVERLAPPING_BEACONS) {
							break;
						}
					}

					if (matches >= OVERLAPPING_BEACONS) {
						fit = true;
						fitScan = s.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]);
						break;
					}
				}
			}

			if (fit) {
				break;
			}
		}

		if (fit) {
			break;
		}
	}

	return fit ? fitScan : null;
}

export default (file: string) => {
	const scans = file.split('\n\n').map((rest) => {
		const [, ...lines] = rest.split('\n');

		return lines.map((line) => line.split(',').map(Number));
	});

	const origin = scans.shift();
	const world = new Map();

	origin.forEach((coord: Coord) => {
		add(world, ...coord);
	});

	while (scans.length !== 0) {
		const scan = scans.shift();
		const result = fitToWorld(scan, world);

		if (result) {
			result.forEach((coord: Coord) => {
				add(world, ...coord);
			});
		} else {
			scans.push(scan);
		}
	}

	return world.size;
};
