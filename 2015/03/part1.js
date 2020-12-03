function input(lines) {
    return lines[0];
}

function solve(input) {
    let grid = {};
    let x = 0;
    let y = 0;
    let visits = 0;

    grid['0,0'] = true;
    visits++;

    for (let step of input) {
        switch (step) {
            case '^':
                y++;
                break;
            case '<':
                x--;
                break;
            case '>':
                x++;
                break;
            case 'v':
                y--;
                break;
        }

        if (!grid[`${x},${y}`]) {
            grid[`${x},${y}`] = true;
            visits++;
        }
    }

    return visits;
}

module.exports = {
    solve,
    input,
};
