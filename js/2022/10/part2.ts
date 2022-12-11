import { CPU, parse } from './part1';

export default (file: string) => {
	const program = parse(file);
	let column = 0;
	let row = 0;
	let output = Array.from({ length: 6 }).fill('');

	const cpu = new CPU((cpu) => {
		const { register } = cpu;

		output[row] += column >= register - 1 && column <= register + 1 ? '#' : '.';
		column += 1;

		if (column === 40) {
			column = 0;
			row += 1;
		}

		if (row === 6) {
			row = 0;
		}
	});

	cpu.exec(program);

	return '\n' + output.join('\n');
};
