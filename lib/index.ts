import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { performance } from 'perf_hooks';
import { pad } from '@lib/utils';

/**
 * Loosley based off of https://github.com/markheath/advent-of-code-js
 */

const args = process.argv.splice(2);

let [year, ioDay, parts] = args;

if (!year) {
    console.error(chalk.red('A year and day must be provided. Ex: 2020'));
    process.exit();
}

let days;

if (!ioDay) {
    days = fs
        .readdirSync(path.join(__dirname, '..', year), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .map((dir) => dir.name);
} else {
    days = [ioDay];
}

const jolly = (x: string) =>
    x
        .split('')
        .map((c, i) => (i % 2 ? chalk.green(c) : chalk.red(c)))
        .join('');

const title = 'Advent of Code';
console.log(jolly(title));
console.log(`${chalk.bold(jolly(pad(year, title.length, ' ')))}\n`);

// default to part 1 and 2
// @TODO there is only ever two parts, so hardcoded is ok
// but maybe we can just read the fs.
const sections = parts ? parts.split(',').map(Number) : [1, 2];
let padding = 'Part 1'.length;

type Answer = string | number | object;
interface SolveFunction extends Function {
    (input: string): Answer;
}

const getInput = (file) => {
    return fs.readFileSync(file, 'utf8').replace(/[\r]/g, '');
};

for (let i = 0; i < days.length; i++) {
    const day = days[i];

    console.log(chalk.bold(`${pad('Day', padding, ' ')}: ${day}`));

    const dir = path.join(__dirname, '..', year, pad(day, 2));
    let input;

    try {
        input = getInput(path.join(dir, 'input.txt'));
    } catch (e) {
        console.error(
            chalk.red(`Cannot find input for year ${year} day ${day}.`),
        );
        continue;
    }

    for (const part of sections) {
        let module:
            | { default: SolveFunction; skip?: boolean; input?: string }
            | SolveFunction;
        let solver: SolveFunction;
        let skip = false;
        let prevInput;

        try {
            module = require(path.join(dir, `part${part}`));

            if (typeof module === 'function') {
                solver = module;
            } else {
                solver = module.default;
                skip = module.skip;

                if (module.input) {
                    prevInput = input;
                    try {
                        input = getInput(path.join(dir, module.input));
                    } catch (e: any) {
                        console.error(
                            chalk.red(
                                `Cannot get custom input "${module.input}"`,
                            ),
                        );
                    }
                }
            }
        } catch (e: any) {
            if (e.code == 'MODULE_NOT_FOUND') {
                break;
            }

            console.error(chalk.red(e));
            continue;
        }

        if (skip) {
            console.log(
                `${chalk.red(
                    pad(`Part ${part}`, padding, ' ') + ':',
                )} ${chalk.red('Skipped')}`,
            );
            continue;
        }

        const start = performance.now();
        let answer = solver(input);
        const end = performance.now();
        const time = Math.round(end - start);

        // reset input
        if (prevInput) {
            input = prevInput;
        }

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
