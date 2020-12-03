const path = require('path');
const fs = require('fs');

/**
 * Loosley based off of https://github.com/markheath/advent-of-code-js
 */

const args = process.argv.splice(2);

let [year, day, parts] = args;

if (!year || !day) {
    console.error('A year and day must be provided. Ex: 2020 1');
    return;
}

console.log(`\nYear: ${year} Day: ${day}`);

// default to part 1 and 2
parts = parts ? parts.split(',').map(Number) : [1, 2];

let dir = path.join(__dirname, year, pad(day, 2));
let input;

try {
    input = fs
        .readFileSync(path.join(dir, 'input.txt'), 'utf8')
        .split('\n')
        .map((str) => str.replace(/\r$/, ''))
        .filter((str) => str.length > 0);
} catch (e) {
    console.error(`Error: Cannot find input for year ${year} day ${day}.`);
    return;
}

for (let part of parts) {
    let solver;

    try {
        solver = require(path.join(dir, `part${part}.js`));
    } catch (e) {
        if (e.code == 'MODULE_NOT_FOUND') {
            break;
        }

        throw e;
    }

    let parsedInput = (solver.input && solver.input(input)) || input;

    let answer = solver.solve(parsedInput);

    console.log(`[Part ${part}]: ${answer}`);
}

function pad(str, length, char = '0') {
    while (str.length < length) {
        str = char + str;
    }

    return str;
}
