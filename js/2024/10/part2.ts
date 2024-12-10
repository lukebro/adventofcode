export default (input: string) => {
	const map = input
		.split('\n')
		.map((line) => line.split('').map((n) => (n === '.' ? -1 : Number(n))));

	function key(x: number, y: number) {
		return `${x},${y}`;
	}

	let sum = 0;

	function walk(x: number, y: number, visited: Map<string, true>) {
		const current = map[y][x];

		visited.set(key(x, y), true);

		if (current === 9) {
			sum += 1;
			return;
		}

		const options = [
			[x + 1, y],
			[x - 1, y],
			[x, y + 1],
			[x, y - 1],
		];

		for (const option of options) {
			const [ax, ay] = option;
			const value = map?.[ay]?.[ax];
			const k = key(ax, ay);

			if (
				typeof value === 'number' &&
				!visited.get(k) &&
				value - current === 1
			) {
				walk(ax, ay, new Map(visited));
			}
		}
	}

	for (let y = 0; y < map.length; ++y) {
		for (let x = 0; x < map[y].length; ++x) {
			const point = map[y][x];

			if (point === -1) {
				continue;
			}

			if (point === 0) {
				walk(x, y, new Map());
			}
		}
	}

	return sum;
};
