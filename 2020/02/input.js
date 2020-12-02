function input(lines) {
    const matcher = /(\d+)\-(\d+)\s(.):\s(.*)/;

    return lines.map((line) => {
        let [, min, max, char, password] = line.match(matcher);

        return { min, max, char, password };
    });
}

module.exports = input;
