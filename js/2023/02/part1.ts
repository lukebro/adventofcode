import { findall } from '@lib/utils';

export default (input: string) => {
	const lines = input.split('\n');

	const MAX = { blue: 14, red: 12, green: 13 };

	let answer = 0;
	for (const line of lines) {
		const game = findall(/Game (\d+):/, line);

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

		let good = true;

		for (const hands of parts) {
			for (const hand of hands) {
				const color = hand[1];
				const count = parseInt(hand[0], 10);

				if (count > MAX[color]) {
					good = false;
					break;
				}
			}

			if (!good) {
				break;
			}
		}

		if (good) {
			answer += parseInt(game, 10);
		}
	}

	return answer;
};
