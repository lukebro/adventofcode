export default (file: string) => {
	const plot = file.split('\n').map((line) => line.split('').map(Number));

	let visible = 0;
	for (let y = 0; y < plot.length; ++y) {
		for (let x = 0; x < plot.length; ++x) {
			if (isVisible(plot, y, x)) {
				visible += 1;
			}
		}
	}

	return visible;
};

function isVisible(plot, row, col) {
	return (
		testX(plot, row, col, 1) ||
		testX(plot, row, col, -1) ||
		testY(plot, row, col, 1) ||
		testY(plot, row, col, -1)
	);
}

function testX(plot, row, col, direction = 1) {
	const SIZE = plot.length;
	const tree = plot[row][col];

	for (let i = col + direction; i >= 0 && i < SIZE; i += direction) {
		if (plot[row][i] >= tree) {
			return false;
		}
	}

	return true;
}

function testY(plot, row, col, direction = 1) {
	const SIZE = plot.length;
	const tree = plot[row][col];

	for (let i = row + direction; i >= 0 && i < SIZE; i += direction) {
		if (plot[i][col] >= tree) {
			return false;
		}
	}

	return true;
}
