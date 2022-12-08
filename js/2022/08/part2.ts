export default (file: string) => {
	const plot = file.split('\n').map((line) => line.split('').map(Number));

	let max = 0;

	for (let y = 0; y < plot.length; ++y) {
		for (let x = 0; x < plot.length; ++x) {
			max = Math.max(max, measureVisibility(plot, y, x));
		}
	}

	return max;
};

function measureVisibility(plot, row, col): number {
	return (
		measureX(plot, row, col, 1) *
		measureX(plot, row, col, -1) *
		measureY(plot, row, col, 1) *
		measureY(plot, row, col, -1)
	);
}

function measureX(plot, row, col, direction = 1) {
	const SIZE = plot.length;
	const tree = plot[row][col];

	let visibility = 0;

	for (let i = col + direction; i >= 0 && i < SIZE; i += direction) {
		visibility += 1;

		if (plot[row][i] >= tree) {
			break;
		}
	}

	return visibility;
}

function measureY(plot, row, col, direction = 1) {
	const SIZE = plot.length;
	const tree = plot[row][col];

	let visibility = 0;

	for (let i = row + direction; i >= 0 && i < SIZE; i += direction) {
		visibility += 1;

		if (plot[i][col] >= tree) {
			break;
		}
	}

	return visibility;
}

function measure(plot, row, col, direction = 1, getter) {
	const SIZE = plot.length;
	const tree = plot[row][col];

	let visibility = 0;

	for (let i = row + direction; i >= 0 && i < SIZE; i += direction) {
		visibility += 1;

		if (getter(i, row, col) >= tree) {
			break;
		}
	}

	return visibility;
}
