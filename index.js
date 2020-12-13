const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { performance } = require('perf_hooks');
const { pad } = require('./utils');

/**
 * Loosley based off of https://github.com/markheath/advent-of-code-js
 */

const args = process.argv.splice(2);

let [year, ioDay, parts] = args;

if (!year) {
    console.error(chalk.red('A year and day must be provided. Ex: 2020'));
    return;
}

let days;

if (!ioDay) {
    days = fs
        .readdirSync(path.join(__dirname, year), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => dir.name);
} else {
    days = [ioDay];
}

let jolly = (x) =>
    x
        .split('')
        .map((c, i) => (i % 2 ? chalk.green(c) : chalk.red(c)))
        .join('');

let title = jolly(`Year: `);
let dYear = jolly(year);
console.log(jolly('Advent of Code'));
console.log(`${title}${chalk.bold(dYear)}\n`);

// default to part 1 and 2
// @TODO there is only ever two parts, so hardcoded is ok
// but maybe we can just read the fs.
parts = parts ? parts.split(',').map(Number) : [1, 2];
let padding = 'Part 1'.length;

for (let i = 0; i < days.length; i++) {
    let day = days[i];

    console.log(chalk.bold(`${pad('Day', padding, ' ')}: ${day}`));

    let dir = path.join(__dirname, year, pad(day, 2));
    let input;

    try {
        input = fs
            .readFileSync(path.join(dir, 'input.txt'), 'utf8')
            .replace(/[\r]/g, '');
    } catch (e) {
        console.error(`Error: Cannot find input for year ${year} day ${day}.`);
        continue;
    }

    for (let part of parts) {
        let solver;

        try {
            solver = require(path.join(dir, `part${part}.js`));
        } catch (e) {
            if (e.code == 'MODULE_NOT_FOUND') {
                break;
            }

            console.error(e);
            continue;
        }

        let answer;

        let start = performance.now();
        if (typeof solver === 'function') {
            answer = solver(input);
        } else {
            let parsedInput = (solver.parse && solver.parse(input)) || input;
            answer = solver.solve(parsedInput);
        }
        let end = performance.now();
        let time = Math.round(end - start);

        if (typeof answer === 'object') {
            answer = JSON.stringify(answer, null, 4);
        }

        console.log(
            `${chalk.red(
                pad(`Part ${part}`, padding, ' ') + ':',
            )} ${chalk.green(answer)} ${chalk.black(`in ${time}ms`)}`,
        );
    }

    console.log();
}
