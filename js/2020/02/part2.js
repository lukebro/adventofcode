module.exports = (lines) => {
    const matcher = /(\d+)-(\d+) (.): (.*)/;
    const input = lines.split('\n').map((line) => {
        let [, min, max, char, password] = line.match(matcher);

        return { min: parseInt(min), max: parseInt(max), char, password };
    });

    const valid = input.filter((p) => {
        let first = p.password[p.min - 1] === p.char;
        let second = p.password[p.max - 1] === p.char;

        return (first || second) && !(first && second);
    });

    return valid.length;
};
