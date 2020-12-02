function input(lines) {
    return lines[0];
}

function solve(input) {
    let floor = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            floor++;
        } else if (input[i] === ')') {
            floor--;
        }
    }

    return floor;
}

module.exports = {
    solve,
    input
};
