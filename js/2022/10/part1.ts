import { sum } from '@lib/utils';

export default (file: string) => {
	const program = parse(file);
	const cpu = new CPU();

	cpu.exec(program);

	return sum(cpu.signals);
};

export function parse(file: string) {
	return file.split('\n').map((line) => {
		const [type, value] = line.split(' ');

		if (type === 'noop') {
			return { type, value: null };
		} else if (type === 'addx') {
			return { type, value: parseInt(value, 10) };
		}
	});
}

export class CPU {
	signals = [];

	signal = 20;

	register = 1;
	pc = 0;

	onCycle?: (CPU) => void = undefined;

	constructor(onCycle?: (CPU) => void) {
		this.onCycle = onCycle;
	}

	cycle(num = 1) {
		for (let i = 0; i < num; ++i) {
			this.pc += 1;

			if (this.onCycle) {
				this.onCycle(this);
			}

			if (this.pc === this.signal) {
				this.signals.push(this.pc * this.register);
				this.signal += 40;
			}
		}
	}

	exec(program) {
		for (const { type, value } of program) {
			if (type === 'noop') {
				this.cycle();
			} else if (type === 'addx') {
				this.cycle(2);
				this.register += value;
			}
		}
	}
}
