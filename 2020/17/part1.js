const { assert } = require('../../utils');

// Array factory
const make = (size, contents) => {
    return Array.from({ length: size }, contents);
};

/**
 * Expand grid by volume in all direction by an mount.
 */
const expandGrid = (grid, by) => {
    let size = Math.floor(by) * 2 + grid.length;

    for (let z = 0; z < grid.length; z++) {
        let yPlane = grid[z];

        for (let y = 0; y < yPlane.length; y++) {
            let zPlane = yPlane[y];

            while (zPlane.length < size) {
                zPlane.unshift('.');
                zPlane.push('.');
            }
        }

        while (yPlane.length < size) {
            let xPlane = make(size, () => '.');

            yPlane.unshift([...xPlane]);
            yPlane.push([...xPlane]);
        }
    }

    while (grid.length < size) {
        let xPlane = make(size, () => '.');

        grid.unshift([...make(size, () => [...xPlane])]);
        grid.push([...make(size, () => [...xPlane])]);
    }
};

/**
 * Deep clone grid.
 */
const clone = (grid) => {
    if (typeof grid !== 'object') return grid;

    let next = [];

    for (let layer in grid) {
        let value = grid[layer];

        next[layer] = clone(value);
    }

    return next;
};

/**
 * Get any neighbor at any point in space.
 */
const neighbors = (grid, x0, y0, z0) => {
    let result = { '#': 0, '.': 0 };

    for (let z = z0 - 1; z <= z0 + 1; z++) {
        for (let y = y0 - 1; y <= y0 + 1; y++) {
            for (let x = x0 - 1; x <= x0 + 1; x++) {
                if (x === x0 && y === y0 && z === z0) {
                    continue;
                }

                let zPlane = grid[z];
                let yPlane = zPlane && zPlane[y];
                let value = yPlane && yPlane[x];

                if (value && value === '#') {
                    result['#'] += 1;
                } else if (value && value === '.') {
                    result['.'] += 1;
                } else {
                    result['.'] += 1;
                }
            }
        }
    }

    // we should always have 26 neighbors
    assert(result['#'] + result['.'] === 26);

    return result;
};

/**
 * Cycle the grid once.
 * Returns a new grid.
 */
const cycle = (grid) => {
    let next = clone(grid);

    for (let z = 0; z < grid.length; z++) {
        let yPlane = grid[z];

        for (let y = 0; y < yPlane.length; y++) {
            let xPlane = yPlane[y];

            for (let x = 0; x < xPlane.length; x++) {
                let value = xPlane[x];
                let n = neighbors(grid, x, y, z);

                if (value === '#' && n['#'] !== 2 && n['#'] !== 3) {
                    next[z][y][x] = '.';
                } else if (value === '.' && n['#'] === 3) {
                    next[z][y][x] = '#';
                }
            }
        }
    }

    return next;
};

/**
 * Count active
 */
const countActive = (grid) => {
    if (typeof grid === 'string') {
        return grid === '#' ? 1 : 0;
    }

    let active = 0;

    for (let layer in grid) {
        active += countActive(grid[layer]);
    }

    return active;
};

module.exports = (file, cycles = 6) => {
    let yx = file.split('\n').map((l) => l.split(''));
    // [z [y [x]]]
    let grid = [yx];

    // where arg[0] is grid
    // and arg[1] is the expanded size of grid we need to record results
    // starting + number cycles we have
    expandGrid(grid, (yx.length / 2) + cycles);

    while (cycles > 0) {
        grid = cycle(grid);

        cycles -= 1;
    }

    return countActive(grid);
};
