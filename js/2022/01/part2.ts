import { sum } from '@lib/utils';

export default (input: string) => {
	const calories = input
		.split('\n\n')
		.map((elf) => sum(elf.split('\n').map((x) => parseInt(x, 10))))
		.sort((a, b) => b - a);

	let total = 0;

	for (let i = 0; i < 3; ++i) {
		total += calories[i];
	}

	return total;
};
