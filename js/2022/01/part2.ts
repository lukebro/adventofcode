import { sum } from '@lib/utils';

export default (input: string) => {
	const calories = input
		.split('\n\n')
		.map((elf) => sum(elf.split('\n').map((x) => parseInt(x, 10))))
		.sort((a, b) => b - a);

	return sum(calories.slice(0, 3));
};
