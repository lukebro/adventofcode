import { findall } from '@lib/utils';

export default (file: string) => {
	const lines = file.split('\n');

	const [drawInput, ...boardInput] = lines;
	const draw = drawInput.split(',').map((n) => parseInt(n, 10));

	const boards: Square[][] = [];
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

	let winner;
	let lastNumber;
	for (const picked of draw) {
		for (const board of boards) {
			mark(board, picked);

			if (checkWinner(board)) {
				winner = board;
				break;
			}
		}

		if (winner) {
			lastNumber = picked;
			break;
		}
	}

	const sum = winner.reduce((acc, n) => {
		if (!n.picked) {
			acc += n.value;
		}
		return acc;
	}, 0);

	return sum * lastNumber;
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
