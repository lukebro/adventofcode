function input(lines) {
    const matcher = /(\d+)-(\d+) (.): (.*)/;

    return lines.map((line) => {
        let [, min, max, char, password] = line.match(matcher);

        return { min: parseInt(min), max: parseInt(max), char, password };
    });
}

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
