export default (file: string) => {
	const keyOne = ['A', 'B', 'C'];
	const keyTwo = ['X', 'Y', 'Z'];

	const games = file.split('\n').map((input) => input.split(' '));

	let score = 0;

	for (const game of games) {
		const [handOne, handTwo] = game;

		const x = keyOne.indexOf(handOne);
		const y = keyTwo.indexOf(handTwo);

		score += y + 1;

		if (x === y) {
			score += 3;
		} else if ((y + 1) % 3 !== x) {
			score += 6;
		}
	}

	return score;
};
