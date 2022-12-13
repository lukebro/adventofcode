export default (file: string) => {
	const pairs = file
		.split('\n\n')
		.map((pairs) => pairs.split('\n').map((line) => JSON.parse(line)));

	let correct = 0;
	pairs.forEach((pair, index) => {
		const [a, b] = pair;
		if (checkOrder(a, b)) {
			correct += index + 1;
		}
	});

	return correct;
};

export function checkOrder(left, right): boolean {
	if (typeof left === 'number' && typeof right === 'number') {
		if (left < right) {
			return true;
		}

		if (left > right) {
			return false;
		}

		return null;
	}

	if (Array.isArray(left) && Array.isArray(right)) {
		for (let i = 0; i < left.length; ++i) {
			if (right[i] === undefined) {
				return false;
			}

			const r = checkOrder(left[i], right[i]);

			if (r !== null) {
				return r;
			}
		}

		if (left.length < right.length) {
			return true;
		}

		return null;
	}

	if (typeof left === 'number') {
		left = [left];
	}

	if (typeof right === 'number') {
		right = [right];
	}

	return checkOrder(left, right);
}
