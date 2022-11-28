import { findall } from '@lib/utils';

type Graph = Map<string, Set<string>>;

export default (file: string) => {
	const makeGraph = (input: string): Graph =>
		input.split('\n').reduce(
			(graph: Graph, line, string) => {
				const [left, right] = findall(/([a-zA-Z]+)-([a-zA-Z]+)/g, line);

				if (left === 'start') {
					graph.get(left).add(right);
					return graph;
				} else if (right === 'start') {
					graph.get(right).add(left);
					return graph;
				}

				if (graph.has(left)) {
					graph.get(left).add(right);
				} else {
					graph.set(left, new Set([right]));
				}

				if (graph.has(right)) {
					graph.get(right).add(left);
				} else {
					graph.set(right, new Set([left]));
				}

				return graph;
			},
			new Map([
				['start', new Set()],
				['end', new Set()],
			]) as Graph,
		);

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
		doubleDipped: boolean = false,
	): void => {
		const edges = graph.get(cave);

		visited.push(cave);

		if (cave === 'end') {
			found.push(visited);
			return;
		}

		for (const edge of edges) {
			const isSmall = isSmallCave(edge);
			const haveVisited = visited.indexOf(edge) > -1;

			if (isSmall && haveVisited && doubleDipped) {
				continue;
			}

			let nextDD = doubleDipped;

			if (isSmall && haveVisited && !doubleDipped) {
				nextDD = true;
			}

			traverse(edge, graph, found, visited.slice(), nextDD);
		}
	};

	const graph = makeGraph(file);
	const foundPaths = findAllPaths('start', graph);

	return foundPaths.length;
};
