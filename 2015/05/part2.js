function input(lines) {
    return lines;
}

function solve(input) {
    let v = ['a', 'e', 'i', 'o', 'u'];
    let bad = ['ab', 'cd', 'pq', 'xy'];
    let nice = 0;

    for (let str of input) {
        let matches = str.match(/([a-z])\1+/);

        if (!matches) {
            continue;
        }

        let [double] = matches;


        let nextMatch = str.match(new RegExp(double + '.*' + double));

        if (!nextMatch) {
            continue;
        }

        let finalMatch = str.match(/([a-z]).*\1/);

        console.log(finalMatch);
        
        if (!str.match(/([a-z])(.*){1,}\1/)) {
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
