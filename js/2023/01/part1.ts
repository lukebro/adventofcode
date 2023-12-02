import { sum } from '@lib/utils';

export default (input: string) => {
	const values = input.split('\n').map((line) => {
		const chars = line.split('');

		let first, last;
		for (let i = 0; i < chars.length; i++) {
			if (!Number.isNaN(parseInt(chars[i], 10))) {
				if (!first) {
					first = chars[i];
				} else {
					last = chars[i];
				}
			}
		}

		if (!last) {
			last = first;
		}

		return parseInt(first + last, 10);
	});

	return sum(values);
};
