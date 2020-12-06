function parse(input) {
    input = input.split('\n\n');

    return input.map((i) => i.split('\n'));
}

function solve(input) {
    let total = 0;

    for (let group of input) {
        let all = {};

        for (let i = 0; i < group.length; i++)
            for (let answer of group[i]) all[answer] = (all[answer] || 0) + 1;

        let everyone = Object.keys(all).filter((c) => all[c] === group.length)
            .length;

        if (everyone > 0) total += everyone;
    }

    return total;
}

module.exports = {
    solve,
    parse,
};
