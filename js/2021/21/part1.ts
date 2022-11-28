import { sum } from '@lib/utils';

const createDie = () => {
	let i = { current: 0, rolls: 0 };

	const roll = () => {
		i.rolls++;
		i.current = (i.current += 1) % 100;

		return i.current;
	};

	function next() {
		const result = [roll(), roll(), roll()];

		return sum(result);
	}

	next.i = i;

	return next;
};

export const score = (current, roll) => {
	let next = (current + roll) % 10;

	if (next === 0) {
		return 10;
	}

	return next;
};

export default (file: string) => {
	const starting = file
		.split('\n')
		.map((line) => parseInt(line.match(/(\d+)/g)[1], 10));

	const roll = createDie();

	const playerOne = {
		score: 0,
		position: starting[0],
	};

	const playerTwo = {
		score: 0,
		position: starting[1],
	};

	let turn = true;

	while (playerOne.score < 1000 && playerTwo.score < 1000) {
		if (turn) {
			const rollOne = roll();
			playerOne.position = score(playerOne.position, rollOne);
			playerOne.score += playerOne.position;
		} else {
			const rollTwo = roll();
			playerTwo.position = score(playerTwo.position, rollTwo);
			playerTwo.score += playerTwo.position;
		}

		turn = !turn;
	}

	const dieRolled = roll.i.rolls;

	if (playerOne.score >= 1000) {
		return dieRolled * playerTwo.score;
	}

	return dieRolled * playerOne.score;
};
