import { Heap } from '@lib/utils';

export const key = (x: number, y: number) => `${x},${y}`;

export interface IGetWeight {
    (grid: number[][], x: number, y: number): number;
}

const getNeighbors = (
    pair: Coord,
    grid: number[][],
    getWeight: IGetWeight,
): Node[] => {
    const [x, y] = pair;

    return [
        [[x - 1, y], getWeight(grid, x - 1, y)],
        [[x + 1, y], getWeight(grid, x + 1, y)],
        [[x, y - 1], getWeight(grid, x, y - 1)],
        [[x, y + 1], getWeight(grid, x, y + 1)],
    ].filter((node) => {
        return node[1] !== undefined;
    }) as Node[];
};

export type Coord = [x: number, y: number];
type Node = [Coord, number];

// implemented pseudocode on https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
export const findLowestRisk = (grid, start: Coord, end: Coord, getWeight) => {
    const dist = new Map<string, number>();
    const queue = new Heap<Node>(function (a: Node, b: Node) {
        return a[1] - b[1];
    });

    for (let y = start[1]; y <= end[1]; y++) {
        for (let x = start[0]; x <= end[0]; x++) {
            dist.set(key(x, y), Infinity);
        }
    }

    dist.set(key(...start), 0);
    queue.push([[...start], 0]);

    while (queue.size !== 0) {
        const [coord] = queue.pop();
        const neighbors = getNeighbors(coord, grid, getWeight);

        for (const [nCoord, nWeight] of neighbors) {
            const nKey = key(...nCoord);

            const alt = dist.get(key(...coord)) + nWeight;
            const distN = dist.get(nKey);

            if (alt < distN) {
                dist.set(nKey, alt);
                queue.push([nCoord, alt]);
            }
        }
    }

    return dist.get(key(...end));
};

export default (file: string) => {
    const grid: number[][] = file
        .split('\n')
        .map((n) => n.split('').map(Number));

    const start: Coord = [0, 0];
    const end: Coord = [grid[grid.length - 1].length - 1, grid.length - 1];

    const getWeight: IGetWeight = (grid, x, y) => {
        return grid?.[y]?.[x];
    };

    return findLowestRisk(grid, start, end, getWeight);
};
