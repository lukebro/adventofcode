import { findLowestRisk, Coord, IGetWeight } from './part1';

export default (file: string) => {
    const grid: number[][] = file
        .split('\n')
        .map((n) => n.split('').map(Number));

    const start: Coord = [0, 0];
    const end: Coord = [grid[0].length * 5 - 1, grid.length * 5 - 1];

    const getWeight: IGetWeight = (grid, x, y) => {
        if (x < 0 || y < 0) {
            return;
        }

        const maxY = grid.length;
        const maxX = grid[0].length;

        const dx = x % maxX;
        const dy = y % maxY;

        const baseWeight = grid[dy][dx];

        const mx = (x - dx) / maxX;
        const my = (y - dy) / maxY;

        const weight = baseWeight + mx + my;

        return (weight % 10) + Math.floor(weight / 10);
    };

    return findLowestRisk(grid, start, end, getWeight);
};
