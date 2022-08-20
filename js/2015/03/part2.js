module.exports = (input) => {
    let grid = {};
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    let visits = 0;

    grid['0,0'] = true;
    visits++;

    for (let i = 0; i < input.length; i++) {
        let step = input[i];
        let santa = i % 2 === 1;

        switch (step) {
            case '^':
                santa ? y1++ : y2++;
                break;
            case '<':
                santa ? x1-- : x2--;
                break;
            case '>':
                santa ? x1++ : x2++;
                break;
            case 'v':
                santa ? y1-- : y2--;
                break;
        }

        if (santa) {
            if (!grid[`${x1},${y1}`]) {
                grid[`${x1},${y1}`] = true;
                visits++;
            }
        } else {
            if (!grid[`${x2},${y2}`]) {
                grid[`${x2},${y2}`] = true;
                visits++;
            }
        }
    }

    return visits;
};
