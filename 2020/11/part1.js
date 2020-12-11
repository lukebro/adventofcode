module.exports = (file) => {
    let lines = file.split('\n');
    let grid = lines.map((line) => line.split(''));

    /**
     * Get adacents surrounding a col/row.
     */
    const adacents = (grid, r1, c1) => {
        let adj = [];

        for (let r = r1 - 1; r <= r1 + 1; r++) {
            for (let c = c1 - 1; c <= c1 + 1; c++) {
                if (grid[r] && grid[r][c]) {
                    // skip the coordinate we're looking around
                    if (r1 === r && c1 === c) {
                        continue;
                    }

                    adj.push(grid[r][c]);
                }
            }
        }

        // change shape to {'#': 1, '.': 1, 'L': '1}
        return adj.reduce(
            (acc, v) => {
                acc[v] = (acc[v] || 0) + 1;

                return acc;
            },
            { '#': 0, '.': 0, L: 0 },
        );
    };

    const rearrange = (grid) => {
        let changed = false;
        let next = [];

        for (let r = 0; r < grid.length; r++) {
            next.push([]);
            for (let c = 0; c < grid[r].length; c++) {
                let a = adacents(grid, r, c);
                let v = grid[r][c];

                if (v === 'L' && a['#'] === 0) {
                    changed = true;
                    next[r][c] = '#';
                } else if (v === '#' && a['#'] >= 4) {
                    changed = true;
                    next[r][c] = 'L';
                } else {
                    next[r][c] = v;
                }
            }
        }

        return [changed, next];
    };

    let changing = true;
    let next = grid;

    // while it's still changing keep rearranging
    while (changing) {
        [changing, next] = rearrange(next);
    }

    let countOccupied = (grid) => {
        let o = 0;
        for (r in grid)
            for (c in grid[r])
                if (grid[r][c] === '#') {
                    o += 1;
                }
        return o;
    };

    return countOccupied(next);
};
