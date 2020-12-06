function parse(input) {
    return input.split('\n').map((line) => {
        let [, action, x1, y1, x2, y2] = line.match(
            /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
        );

        return [action, parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2)];
    });
}

const turn = (grid, action, x1, y1, x2, y2) => {
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            let index = x * 1000 + y; // 100234 would be 100, 234

            let prev = grid[index] || 0;

            if (action == 'toggle') {
                grid[index] = prev + 2;
            } else if (action == 'turn off') {
                grid[index] = Math.max(0, prev - 1);
            } else if (action == 'turn on') {
                grid[index] = prev + 1;
            }
        }
    }
};

function solve(input) {
    let grid = [];
    let lit = 0;

    for (let instruction of input) {
        turn(grid, ...instruction);
    }

    return grid.reduce((t, x) => t + x, 0);
}

module.exports = {
    solve,
    parse,
};
