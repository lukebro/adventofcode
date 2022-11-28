export default (input: string) => {
	const lines = input.split('\n').map(Number);

	let increases = 0;
	let prev = Infinity;

	for (let i = 2; i < lines.length; i++) {
		const next = lines[i - 2] + lines[i - 1] + lines[i];

		if (next > prev) {
			increases += 1;
		}

		prev = next;
	}

	return increases;
};
