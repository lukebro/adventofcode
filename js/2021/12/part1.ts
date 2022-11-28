import { findall } from '@lib/utils';

type Graph = Map<string, Set<string>>;

export default (file: string) => {
	const makeGraph = (input: string): Graph =>
		input.split('\n').reduce((graph, line) => {
			const [left, right] = findall(/([a-zA-Z]+)-([a-zA-Z]+)/g, line);

			if (graph.has(left)) {
				graph.get(left).add(right);
			} else {
				graph.set(left, new Set([right]));
			}

			if (left !== 'start') {
				if (graph.has(right)) {
					graph.get(right).add(left);
				} else {
					graph.set(right, new Set([left]));
				}
			}

			return graph;
		}, new Map());

	const isSmallCave = (cave: string): boolean => cave === cave.toLowerCase();

	const findAllPaths = (startingCave: string, graph: Graph): string[][] => {
		const found = [];
		traverse(startingCave, graph, found);
		return found;
	};

	const traverse = (
		cave: string,
		graph: Graph,
		found: string[][],
		visited: string[] = [],
	): void => {
		const edges = graph.get(cave);

		visited.push(cave);

		if (cave === 'end') {
			found.push(visited);
			return;
		}

		for (const edge of edges) {
			// we have visited this edge already
			if (isSmallCave(edge) && visited.indexOf(edge) > -1) {
				continue;
			}

			traverse(edge, graph, found, visited.slice());
		}
	};

	const graph = makeGraph(file);
	const foundPaths = findAllPaths('start', graph);

	return foundPaths.length;
};
