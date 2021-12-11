export default (file: string) => {
    const grid = file.split('\n').map((line) => line.split('').map(Number));
    let flashes = 0;

    const flash = (x, y) => {
        if (grid[y][x] <= 9 || grid[y][x] === 0) return;

        flashes += 1;
        grid[y][x] = 0;

        for (let dy = y - 1; dy <= y + 1; dy++) {
            for (let dx = x - 1; dx <= x + 1; dx++) {
                if (dx === x && dy === y) {
                    continue;
                }

                if (grid?.[dy]?.[dx] !== undefined) {
                    // it has already flashed
                    if (grid[dy][dx] === 0) continue;

                    grid[dy][dx] += 1;

                    if (grid[dy][dx] === 10) {
                        flash(dx, dy);
                    }
                }
            }
        }
    };

    const step = () => {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                grid[y][x] += 1;
            }
        }

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                flash(x, y);
            }
        }
    };

    const debug = () => {
        for (let row of grid) {
            console.log(row.join(''));
        }
        console.log();
    };

    for (let i = 0; i < 100; i++) {
        step();
    }

    return flashes;
};
