const input = require('./input');

function solve(input) {
    const valid = input.filter((p) => {

        let first = p.password[p.min - 1] === p.char;
        let second = p.password[p.max - 1] === p.char;

        return (first || second) && !(first && second);
    });

    return valid.length;
}

module.exports = { input, solve };
