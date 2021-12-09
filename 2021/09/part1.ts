export default (file: string) => {
    const heightmap = file
        .split('\n')
        .map((line) => line.split('').map(Number));

    const getAdjacent = (x, y, heightmap) => {
        return [
            heightmap?.[y]?.[x - 1],
            heightmap?.[y]?.[x + 1],
            heightmap?.[y - 1]?.[x],
            heightmap?.[y + 1]?.[x],
        ].filter((n) => n !== undefined);
    };

    const isLowest = (n, adjacent) => {
        for (let a of adjacent) {
            if (a <= n) {
                return false;
            }
        }

        return true;
    };

    const lowPoints = [];
    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[y].length; x++) {
            const adjacent = getAdjacent(x, y, heightmap);
            const n = heightmap[y][x];

            if (isLowest(n, adjacent)) {
                lowPoints.push(n);
            }
        }
    }

    return lowPoints.reduce((acc, n) => {
        return acc + n + 1;
    }, 0);
};
