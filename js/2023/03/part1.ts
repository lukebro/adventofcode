export default (input: string) => {
	const grid = input.split('\n').map((line) => line.split(''));

	let answer = 0;

	for (let y = 0; y < grid.length; ++y) {
		let start, end;
		let buffer = '';
		for (let x = 0; x < grid[y].length; ++x) {
			const char = grid[y][x];

			if (isNumber(char)) {
				if (!buffer) {
					start = x;
				}
				buffer += char;
				continue;
			}

			if (buffer) {
				end = x - 1;

				if (isPartNumber(grid, start, end, y)) {
					answer += parseInt(buffer, 10);
				}

				buffer = '';
			}
		}

		if (buffer) {
			end = grid[y].length - 1;

			if (isPartNumber(grid, start, end, y)) {
				answer += parseInt(buffer, 10);
			}
		}
	}

	return answer;
};

function isPartNumber(
	grid: string[][],
	start: number,
	end: number,
	row: number,
) {
	for (let y = row - 1; y <= row + 1; ++y) {
		for (let x = start - 1; x <= end + 1; ++x) {
			const char = grid?.[y]?.[x] ?? '.';

			if (char !== '.' && !isNumber(char)) {
				return true;
			}
		}
	}

	return false;
}

function isNumber(char: string) {
	return char >= '0' && char <= '9';
}
