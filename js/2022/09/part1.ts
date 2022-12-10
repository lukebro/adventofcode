export default (file: string) => {
	const moves = parse(file);

	const head = [0, 0];
	const tail = [0, 0];

	const record = new Set();

	record.add('0,0');

	for (const move of moves) {
		const [direction, count] = move;

		for (let i = 0; i < count; ++i) {
			simulate(direction, head, tail);
			record.add(tail.join(','));
		}
	}

	return record.size;
};

export function simulate(direction, head, tail) {
	const previous = [...head];

	if (direction === 'U') {
		head[1] += 1;
	} else if (direction === 'R') {
		head[0] += 1;
	} else if (direction === 'D') {
		head[1] -= 1;
	} else if (direction === 'L') {
		head[0] -= 1;
	}

	if (!isTouching(head, tail)) {
		tail[0] = previous[0];
		tail[1] = previous[1];
	}
}

// is b touching a?
export function isTouching(a, b) {
	for (let x = a[0] - 1; x <= a[0] + 1; ++x) {
		for (let y = a[1] - 1; y <= a[1] + 1; ++y) {
			if (x === b[0] && y === b[1]) {
				return true;
			}
		}
	}

	return false;
}

export function parse(file: string) {
	return file.split('\n').map((line) => {
		const [d, n] = line.split(' ');

		return [d, parseInt(n, 10)];
	});
}
