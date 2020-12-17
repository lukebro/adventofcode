const { assert } = require('../../utils');

// Array factory
const make = (size, contents) => {
    return Array.from({ length: size }, contents);
};

/**
 * Expand grid by volume in all direction by an mount.
 *
 * This gets really messy in 4D because you need to make sure
 * you're creating new arrays every single time.  Perhaps representing
 * some tuple of Map(x,y,z,w) would be better rather than expanding the array out
 * like this... I made a mistake but I'm too far in.  In that case I wouldn't have
 * to expand my array out.
 */
const expandGrid = (grid, by) => {
    let size = Math.floor(by) * 2 + grid.length;

    for (let w = 0; w < grid.length; w++) {
        let zPlane = grid[w];

        for (let z = 0; z < zPlane.length; z++) {
            let yPlane = zPlane[z];

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

        while (zPlane.length < size) {
            let xPlane = make(size, () => '.');

            zPlane.unshift([...make(size, () => [...xPlane])]);
            zPlane.push([...make(size, () => [...xPlane])]);
        }
    }

    while (grid.length < size) {
        let xPlane = make(size, () => '.');
        let zPlane1 = [];
        let zPlane2 = [];

        for (let n = 0; n < size; n++) {


            // while (zPlane1.length < size) {
                zPlane1.push([...make(size, () => [...xPlane])]);
                zPlane2.push([...make(size, () => [...xPlane])]);
            // }
        }

        grid.unshift(zPlane1);
        grid.push(zPlane2);
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
const neighbors = (grid, x0, y0, z0, w0) => {
    let result = { '#': 0, '.': 0 };

    for (let w = w0 - 1; w <= w0 + 1; w++) {
        for (let z = z0 - 1; z <= z0 + 1; z++) {
            for (let y = y0 - 1; y <= y0 + 1; y++) {
                for (let x = x0 - 1; x <= x0 + 1; x++) {
                    if (x === x0 && y === y0 && z === z0 && w === w0) {
                        continue;
                    }

                    let wPlane = grid[w];
                    let zPlane = wPlane && wPlane[z];
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
    }

    // we should always have 80 neighbors in a 4d grid
    assert(result['#'] + result['.'] === 80);

    return result;
};

/**
 * Cycle the grid once.
 * Returns a new grid.
 */
const cycle = (grid) => {
    let next = clone(grid);

    for (let w = 0; w < grid.length; w++) {
        let zPlane = grid[w];

        for (let z = 0; z < zPlane.length; z++) {
            let yPlane = zPlane[z];

            for (let y = 0; y < yPlane.length; y++) {
                let xPlane = yPlane[y];

                for (let x = 0; x < xPlane.length; x++) {
                    let value = xPlane[x];
                    let n = neighbors(grid, x, y, z, w);

                    if (value === '#' && n['#'] !== 2 && n['#'] !== 3) {
                        next[w][z][y][x] = '.';
                    } else if (value === '.' && n['#'] === 3) {
                        next[w][z][y][x] = '#';
                    }
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
    // [w [z [y [x]]]]
    let grid = [[yx]];

    // where arg[0] is grid
    // and arg[1] is the expanded size of grid we need to record results
    // starting + number cycles we have
    expandGrid(grid, yx.length / 2 + cycles);

    while (cycles > 0) {
        grid = cycle(grid);

        cycles -= 1;
    }

    return countActive(grid);
};
