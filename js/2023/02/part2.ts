import { findall } from '@lib/utils';

export default (input: string) => {
	const lines = input.split('\n');

	let answer = 0;
	for (const line of lines) {
		const parts = line
			.split(':')[1]
			.trim()
			.split(';')
			.map((l) => {
				const m = findall(/(\d+) (\w+)/, l.trim());

				if (typeof m[0] === 'string') {
					return [m];
				}

				return m;
			});

		const max = { red: 0, blue: 0, green: 0 };

		for (const hands of parts) {
			for (const hand of hands) {
				const color = hand[1];
				const count = parseInt(hand[0], 10);
				max[color] = Math.max(max[color], count);
			}
		}

		answer += max.red * max.blue * max.green;
	}

	return answer;
};
