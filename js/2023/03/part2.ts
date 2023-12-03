export default (input: string) => {
	const grid = input.split('\n').map((line) => line.split(''));

	let answer = 0;

	const lookup = new Map<string, number[]>();

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
				processBuffer(grid, lookup, buffer, start, end, y);
				buffer = '';
			}
		}

		if (buffer) {
			end = grid[y].length - 1;
			processBuffer(grid, lookup, buffer, start, end, y);
		}
	}

	for (const value of lookup.values()) {
		if (value.length === 2) {
			answer += value[0] * value[1];
		}
	}

	return answer;
};

function processBuffer(
	grid: string[][],
	lookup: Map<string, number[]>,
	buffer: string,
	start: number,
	end: number,
	row: number,
) {
	for (let y = row - 1; y <= row + 1; ++y) {
		for (let x = start - 1; x <= end + 1; ++x) {
			const char = grid?.[y]?.[x] ?? '.';

			if (char === '*') {
				const key = `${x},${y}`;
				const list = lookup.get(key) ?? [];
				list.push(parseInt(buffer, 10));
				lookup.set(key, list);
			}
		}
	}

	return false;
}

function isNumber(char: string) {
	return char >= '0' && char <= '9';
}
