import { findall } from '@lib/utils';

type Line = { x1: number; y1: number; x2: number; y2: number };

// using Ax + By + C = 0
const getLineEquation = (line: Line): Function => {
	const A = line.y1 - line.y2;
	const B = line.x2 - line.x1;
	const C = line.x1 * line.y2 - line.x2 * line.y1;

	const xMin = Math.min(line.x1, line.x2);
	const xMax = Math.max(line.x1, line.x2);
	const yMin = Math.min(line.y1, line.y2);
	const yMax = Math.max(line.y1, line.y2);

	// does this point exist on our line?
	return (x: number, y: number) => {
		const onLine = A * x + B * y + C === 0;
		const minMax = x >= xMin && x <= xMax && y >= yMin && y <= yMax;

		return onLine && minMax;
	};
};

export default (file: string) => {
	let xMax = 0;
	let yMax = 0;
	const equations = file
		.split('\n')
		.map((line): Line => {
			const matches = findall(/(\d+),(\d+) -> (\d+),(\d+)/g, line).map((n) =>
				parseInt(n, 10),
			);

			const [x1, y1, x2, y2] = matches;

			xMax = Math.max(xMax, Math.max(x1, x2));
			yMax = Math.max(yMax, Math.max(y1, y2));

			return { x1, y1, x2, y2 };
		})
		.map(getLineEquation);

	const graph: number[] = Array(xMax * yMax).fill(0);

	for (const equation of equations) {
		for (let i = 0; i < graph.length; i++) {
			const x = i % xMax;
			const y = Math.floor(i / xMax);

			if (equation(x, y)) {
				graph[i] += 1;
			}
		}
	}

	return graph.reduce((count, n) => {
		if (n > 1) {
			count += 1;
		}

		return count;
	}, 0);
};
