import { permutations } from '@lib/utils';

const OVERLAPPING_BEACONS = 12;

// these are too many permutations (by 2x). i don't know enough about
// 3d to reason which ones are duplicates of each other. if i had a rubix cube on my
// desk i would try to figure it out. hindsight i would use a 3x3 rotation matrix and just rotate
const TRANFORMS = permutations([1, -1], { size: 3, repeat: true }); // multiply matrix [1, -1, 1];
const SHUFFLES = permutations([0, 1, 2]); // array index shuffle/reorder

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

export function all(world) {
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
	let scanner;

	for (const beacon of scan) {
		const relScan = relative(beacon, scan);
		const tRelScan = TRANFORMS.map((transform) => [
			relScan.map((coords) => applyTransform(coords, transform)),
			transform,
		]);

		for (const [x, y, z] of map) {
			for (const [t, transform] of tRelScan) {
				const shuffled = SHUFFLES.map((shuffle) => [
					t.map((coords) => applyShuffle(coords, shuffle)),
					shuffle,
				]);

				for (const [s, shuffle] of shuffled) {
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
						scanner = applyShuffle(applyTransform(beacon, transform), shuffle);
						scanner = [scanner[0] + x, scanner[1] + y, scanner[2] + z];

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

	return fit ? [fitScan, scanner] : null;
}

export function solve(scans): [Map<string, number>, number[][]] {
	const origin = scans.shift();
	const world = new Map();

	origin.forEach((coord: Coord) => {
		add(world, ...coord);
	});

	const scanners = [[0, 0, 0]];

	while (scans.length !== 0) {
		const scan = scans.shift();
		const result = fitToWorld(scan, world);

		if (result) {
			const [w, s] = result;
			w.forEach((coord: Coord) => {
				add(world, ...coord);
			});
			scanners.push(s);
		} else {
			scans.push(scan);
		}
	}

	return [world, scanners];
}

export function parse(file) {
	return file.split('\n\n').map((rest) => {
		const [, ...lines] = rest.split('\n');

		return lines.map((line) => line.split(',').map(Number));
	});
}

export default (file: string) => {
	const [world, scanners] = solve(parse(file));

	return world.size;
};
