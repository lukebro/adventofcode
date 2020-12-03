function input(lines) {
    return lines;
}

function solve(input) {
    let v = ['a', 'e', 'i', 'o', 'u'];
    let bad = ['ab', 'cd', 'pq', 'xy'];
    let nice = 0;

    for (let str of input) {
        let matches = str.match(/(([a-z])\1{2})/);

        console.log(matches);

        if (!matches) {
            continue;
        }

        let notContain = bad.filter((a) => str.includes(a)).length;

        if (notContain > 0) {
            continue;
        }

        nice++;
    }

    return nice;
}

module.exports = {
    solve,
    input,
};
