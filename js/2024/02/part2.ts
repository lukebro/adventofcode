export default (input: string) => {
	const lines = input
		.split('\n')
		.map((line) => line.trim().split(' ').map(Number));

	let safe = 0;
	for (const line of lines) {
		if (isSafe(line)) {
			safe++;
		} else {
			for (let i = 0; i < line.length; ++i) {
				const test = [...line];
				test.splice(i, 1);

				if (isSafe(test)) {
					safe++;
					break;
				}
			}
		}
	}

	return safe;
};

function isSafe(line: number[]) {
	const direction = line[0] > line[1];

	for (let i = 0; i < line.length - 1; ++i) {
		if (direction && line[i] < line[i + 1]) {
			return false;
		} else if (!direction && line[i] > line[i + 1]) {
			return false;
		}

		const diff = Math.abs(line[i] - line[i + 1]);

		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	return true;
}
