function parse(input) {
    input = input.split('\n\n');

    return input.map((i) => i.split('\n'));
}

function solve(input) {
    let total = 0;

    for (let group of input) {
        let all = [];

        for (let answers of group) all.push(...answers);

        total += new Set(all).size;
    }

    return total;
}

module.exports = {
    solve,
    parse,
};
