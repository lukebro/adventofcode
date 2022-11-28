import type { Graph, Coord } from './part1';

export default (file: string) => {
	let [first, second] = file.split('\n\n');

	const dots: Coord[] = first
		.split('\n')
		.map((coord) => coord.split(',').map((n) => parseInt(n, 10)) as Coord);

	const instructions: Array<[string, number]> = second
		.split('\n')
		.map((line) => {
			const [, axis, value] = line.match(/fold along ([xy])=(\d+)/);

			return [axis, parseInt(value, 10)];
		});

	const key = (x: number, y: number): string => `${x},${y}`;

	const makeGraph = (dots: Coord[]): Graph => {
		const graph = new Map();

		for (let coords of dots) {
			const [x, y] = coords;

			graph.set(key(x, y), coords);
		}

		return graph;
	};

	const getSize = (graph: Graph) => {
		let x = 0;
		let y = 0;

		for (const [, value] of graph) {
			x = Math.max(value[0], x);
			y = Math.max(value[1], y);
		}

		return [x, y];
	};

	const fold = (graph: Graph, axis: string, fold: number): Graph => {
		const nextGraph = new Map();
		const vertical = axis === 'y';

		for (const [coord, value] of graph) {
			const [x, y] = value;

			if ((vertical ? y : x) >= fold) {
				const newY = vertical ? fold - (y - fold) : y;
				const newX = vertical ? x : fold - (x - fold);

				const k = key(newX, newY);
				if (!nextGraph.has(k)) nextGraph.set(k, [newX, newY]);
			} else {
				nextGraph.set(coord, value);
			}
		}

		return nextGraph;
	};

	const print = (graph: Graph): string => {
		const size = getSize(graph);

		let output = '';

		for (let y = 0; y <= size[1]; y++) {
			for (let x = 0; x <= size[0]; x++) {
				output += graph.has(key(x, y)) ? '#' : '.';
			}

			output += '\n';
		}

		return output;
	};

	let graph = makeGraph(dots);

	for (const instruction of instructions) {
		graph = fold(graph, ...instruction);
	}

	return '\n' + print(graph);
};
