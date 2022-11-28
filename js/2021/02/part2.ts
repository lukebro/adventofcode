import { findall } from '@lib/utils';

export default (file: string) => {
	const commands = file
		.split('\n')
		.map((line) => findall(/(forward|down|up) (\d+)/g, line));

	let depth = 0;
	let aim = 0;
	let horizontal = 0;

	for (const [direction, value] of commands) {
		let inc = Number(value);
		switch (direction) {
			case 'forward':
				horizontal += inc;
				depth += aim * inc;
				break;
			case 'down':
				aim += inc;
				break;
			case 'up':
				aim -= inc;
				break;
		}
	}

	return depth * horizontal;
};
