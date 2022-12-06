export default (input: string) => {
	return solve(4, input);
};

export const solve = (length: number, datastream: string) => {
	const stream = [];
	for (let i = 0; i < datastream.length; ++i) {
		if (stream.length === length) {
			stream.shift();
		}

		stream.push(datastream[i]);

		const test = new Set(stream);

		if (test.size === length) {
			return i + 1;
		}
	}

	return -1;
};
