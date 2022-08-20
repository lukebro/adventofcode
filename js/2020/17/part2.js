/**
 * Get any neighbor at any point in space.
 */
const neighbors = (grid, x0, y0, z0, w0) => {
    let result = 0;

    for (let w = w0 - 1; w <= w0 + 1; w++) {
        for (let z = z0 - 1; z <= z0 + 1; z++) {
            for (let y = y0 - 1; y <= y0 + 1; y++) {
                for (let x = x0 - 1; x <= x0 + 1; x++) {
                    if (x === x0 && y === y0 && z === z0 && w === w0) {
                        continue;
                    }

                    let value = grid.get(`${x},${y},${z},${w}`);

                    if (value && value === 1) {
                        result += 1;
                    }
                }
            }
        }
    }

    return result;
};

const cycle = (grid) => {
    let next = new Map();

    let xr = [0, 0];
    let yr = [0, 0];
    let zr = [0, 0];
    let wr = [0, 0];

    grid.forEach((value, cords) => {
        let [x0, y0, z0, w0] = cords.split(',').map(Number);

        xr[0] = Math.min(xr[0], x0);
        xr[1] = Math.max(xr[1], x0);

        yr[0] = Math.min(yr[0], y0);
        yr[1] = Math.max(yr[1], y0);

        zr[0] = Math.min(zr[0], z0);
        zr[1] = Math.max(zr[1], z0);

        wr[0] = Math.min(wr[0], w0);
        wr[1] = Math.max(wr[1], w0);
    });

    for (let w = wr[0] - 2; w <= wr[1] + 2; w++) {
        for (let z = zr[0] - 2; z <= zr[1] + 2; z++) {
            for (let y = yr[0] - 2; y <= yr[1] + 2; y++) {
                for (let x = xr[0] - 2; x <= xr[1] + 2; x++) {
                    let n = neighbors(grid, x, y, z, w);
                    let c = `${x},${y},${z},${w}`;
                    let value = grid.get(c) || 0;

                    if (value === 1 && (n === 2 || n === 3)) {
                        next.set(c, 1);
                    } else if (value === 0 && n === 3) {
                        next.set(c, 1);
                    }
                }
            }
        }
    }

    return next;
};

module.exports = (file, cycles = 6) => {
    let yx = file.split('\n').map((l) => l.split(''));
    let grid = new Map();
    let size = yx.length;

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            grid.set(`${x},${y},0,0`, yx[y][x] === '#' ? 1 : 0);
        }
    }

    while (cycles > 0) {
        grid = cycle(grid);

        cycles -= 1;
    }

    let active = 0;

    grid.forEach((value) => {
        active += value;
    });

    return active;
};
