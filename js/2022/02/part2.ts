export default (file: string) => {
	const key = ['A', 'B', 'C'];
	const games = file.split('\n').map((input) => input.split(' '));

	let score = 0;

	for (const game of games) {
		const [handOne, handTwo] = game;

		const play = key.indexOf(handOne);

		if (handTwo === 'X') {
			score += ((play - 1 + 3) % 3) + 1;
		} else if (handTwo === 'Y') {
			score += play + 1 + 3;
		} else if (handTwo === 'Z') {
			score += ((play + 1 + 3) % 3) + 1 + 6;
		}
	}

	return score;
};
