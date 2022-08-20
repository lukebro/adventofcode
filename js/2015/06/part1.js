const turn = (grid, action, x1, y1, x2, y2) => {
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            let index = x * 1000 + y; // 100234 would be 100, 234

            if (action == 'toggle') {
                grid[index] = (grid[index] || 0) ^ 1;
            } else if (action == 'turn off') {
                grid[index] = 0;
            } else if (action == 'turn on') {
                grid[index] = 1;
            }
        }
    }
};

module.exports = (input) => {
    input = input.split('\n').map((line) => {
        let [, action, x1, y1, x2, y2] = line.match(
            /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/,
        );

        return [action, parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2)];
    });

    let grid = [];

    for (let instruction of input) {
        turn(grid, ...instruction);
    }

    return grid.reduce((t, x) => t + x, 0);
};
