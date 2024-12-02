export default (input: string) => {
	const lines = input
		.split('\n')
		.map((line) => line.trim().split(' ').map(Number));

	let safe = 0;
	for (const line of lines) {
		let direction = line[0] > line[1];

		let valid = true;

		for (let i = 0; i < line.length - 1; ++i) {
			if (direction && line[i] < line[i + 1]) {
				valid = false;
				break;
			} else if (!direction && line[i] > line[i + 1]) {
				valid = false;
				break;
			}

			const diff = Math.abs(line[i] - line[i + 1]);

			if (diff < 1 || diff > 3) {
				valid = false;
				break;
			}
		}

		if (valid) {
			safe++;
		}
	}

	return safe;
};
