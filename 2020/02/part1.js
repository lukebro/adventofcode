const input = require('./input');

function solve(input) {
    let valid = input.filter((p) => {
        let count = (p.password.match(new RegExp(p.char, 'g')) || []).length;

        return count >= p.min && count <= p.max;
    });

    return valid.length;
}

module.exports = {
    solve,
    input
};
