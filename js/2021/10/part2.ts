export default (file: string) => {
	const lines = file.split('\n');

	const KEY = {
		'(': ')',
		'{': '}',
		'<': '>',
		'[': ']',
	};

	const SCORE = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	};

	const syntaxCheck = (line) => {
		const stack = [];
		const state = { c: false, i: false, error: null, missing: null, stack };

		for (let i = 0; i < line.length; i++) {
			const input = line.charAt(i);

			if (KEY[input]) {
				stack.push(input);
			} else {
				const item = stack.pop();

				if (KEY[item] !== input) {
					state.c = true;
					state.error = { expected: KEY[item], found: input };

					return state;
				}
			}
		}

		if (stack.length !== 0) {
			state.i = true;
			const missing = [];
			const remainder = stack.slice();
			state.missing = missing;

			while (remainder.length !== 0) {
				const n = remainder.pop();
				missing.push(KEY[n]);
			}
		}

		return state;
	};

	const scores = [];

	for (let line of lines) {
		const state = syntaxCheck(line);

		if (state.c) continue;
		if (!state.i) continue;

		let points = 0;
		for (const n of state.missing) {
			points = points * 5;
			points += SCORE[n];
		}

		scores.push(points);
	}

	scores.sort((a, b) => b - a);

	return scores[Math.floor(scores.length / 2)];
};
