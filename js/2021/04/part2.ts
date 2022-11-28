import { findall } from '@lib/utils';

export default (file: string) => {
	const lines = file.split('\n');

	const [drawInput, ...boardInput] = lines;
	const draw = drawInput.split(',').map((n) => parseInt(n, 10));

	let boards: Square[][] = [];
	let board: Square[] = [];
	for (let line of boardInput) {
		if (line === '') {
			continue;
		}

		const numbers = findall(/(\d+)/g, line);

		board.push(
			...numbers.map((n) => ({ value: parseInt(n, 10), picked: false })),
		);

		if (board.length === 25) {
			boards.push(board);
			board = [];
		}
	}

	let lastPicked;
	let index = 0;
	let lastWinner;
	while (boards.length > 0 && index < draw.length) {
		lastPicked = draw[index];
		let nextBoards = [];
		for (const board of boards) {
			mark(board, lastPicked);

			if (!checkWinner(board)) {
				nextBoards.push(board);
			} else {
				lastWinner = board;
			}
		}

		boards = nextBoards;
		index += 1;
	}

	const sum = lastWinner.reduce((acc, n) => {
		if (!n.picked) {
			acc += n.value;
		}
		return acc;
	}, 0);

	return sum * lastPicked;
};

type Square = { value: number; picked: boolean };

function mark(board, number) {
	for (let i = 0; i < board.length; i++) {
		if (board[i].value === number) {
			board[i].picked = true;

			return;
		}
	}
}

function checkWinner(board: Square[]): boolean {
	// check rows
	for (let i = 0; i < board.length; i += 5) {
		let colWinner = true;
		let rowWinner = true;
		for (let j = 0; j < 5; j++) {
			if (!board[i + j].picked) {
				rowWinner = false;
			}

			if (!board[i / 5 + j * 5].picked) {
				colWinner = false;
			}

			if (!rowWinner && !colWinner) {
				break;
			}
		}

		if (rowWinner || colWinner) return true;
	}

	return false;
}
