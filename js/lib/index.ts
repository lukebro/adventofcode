import 'dotenv/config';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import fse from 'fs-extra';
import chalk from 'chalk';
import { pad } from './utils';

const args = process.argv.splice(2);

let [year, ioDay, parts] = args;

if (!year) {
	console.error(chalk.red('A year and day must be provided. Ex: 2020'));
	process.exit();
}

let days;

if (!ioDay) {
	try {
		days = fse
			.readdirSync(path.join(process.cwd(), year), {
				withFileTypes: true,
			})
			.filter((dir) => dir.isDirectory())
			.map((dir) => dir.name);
	} catch (e: any) {
		console.log(chalk.red(`No solutions exist for the year ${year}.`));
		process.exit(1);
	}
} else {
	days = [ioDay];
}

const jolly = (x: string) =>
	x
		.split('')
		.map((c, i) => (Math.round(Math.random()) ? chalk.green(c) : chalk.red(c)))
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

const formatInput = (input) => {
	return input.replace(/[\r]/g, '').replace(/\n+$/g, '');
};

(async () => {
	for await (const day of days) {
		console.log(chalk.white.bold(`Day: ${day}`));

		const dir = path.join(process.cwd(), year, pad(day, 2));

		if (!fse.existsSync(dir)) {
			fse.mkdirSync(dir, { recursive: true });
			const template = path.join(process.cwd(), 'lib', 'template.ts');
			fse.copySync(template, path.join(dir, 'part1.ts'));
			fse.copySync(template, path.join(dir, 'part2.ts'));
			fse.outputFileSync(path.join(dir, 'example.txt'), '');
		}

		const inputPath = path.join(dir, 'input.txt');
		let input;

		if (!fse.existsSync(inputPath)) {
			if (!process.env['AOC_SESSION']) {
				console.error(
					chalk.red(
						`Add your session token to .env to automatically pull the input`,
					),
				);

				continue;
			}

			try {
				const response = await fetch(
					`https://adventofcode.com/${year}/day/${day}/input`,
					{
						headers: {
							Cookie: `session=${process.env['AOC_SESSION']}`,
							'User-Agent':
								'github.com/lukebro/adventofcode by lukebrodowski@gmail.com',
						},
					},
				);

				if (response.status === 404) {
					console.error(chalk.red('The input is not available yet.'));

					continue;
				}

				input = await response.text();
				fse.writeFileSync(inputPath, input, 'utf-8');
				input = formatInput(input);
			} catch (e) {
				continue;
			}
			// file does not exist
		} else {
			try {
				input = formatInput(fse.readFileSync(inputPath, 'utf-8'));
			} catch (e) {
				console.error(
					chalk.red(`Cannot find input for year ${year} day ${day}.`),
				);
				continue;
			}
		}

		for await (const part of sections) {
			let module:
				| { default: SolveFunction; skip?: boolean; input?: string }
				| SolveFunction;
			let solver: SolveFunction;
			let skip = false;
			let prevInput;

			try {
				module = await import(path.join(dir, `part${part}`));

				if (typeof module === 'function') {
					solver = module;
				} else {
					solver = module.default;
					skip = module.skip;

					if (module.input) {
						prevInput = input;
						try {
							input = formatInput(
								fse.readFileSync(path.join(dir, module.input), 'utf-8'),
							);
						} catch (e: any) {
							console.error(
								chalk.red(`Cannot get custom input "${module.input}"`),
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
					`${chalk.red(pad(`Part ${part}`, padding, ' ') + ':')} ${chalk.red(
						'Skipped',
					)}`,
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
				`${chalk.red(pad(`Part ${part}`, padding, ' ') + ':')} ${chalk.green(
					answer,
				)} ${chalk.black(`in ${time}ms`)}`,
			);
		}

		console.log();
	}
})();
