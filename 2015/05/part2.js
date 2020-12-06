function parse(input) {
    return input.split('\n');
}

function solve(input) {
    let v = ['a', 'e', 'i', 'o', 'u'];
    let bad = ['ab', 'cd', 'pq', 'xy'];
    let nice = 0;

    for (let str of input) {
        if (!str.match(/([a-z]{2}).*\1/)) {
            continue;
        }

        if (!str.match(/([a-z]).\1/)) {
            continue;
        }

        nice++;
    }

    return nice;
}

module.exports = {
    solve,
    parse,
};
