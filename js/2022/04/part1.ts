import { findall } from '@lib/utils';

export default (file: string) => {
	const input = file
		.split('\n')
		.map((line) => findall(/(\d+)-(\d+),(\d+)-(\d+)/, line).map(Number));

	return input.reduce((count, i) => {
		if (isInside(i)) {
			count += 1;
		}

		return count;
	}, 0);
};

function isInside(l) {
	if (l[0] >= l[2] && l[1] <= l[3]) {
		return true;
	}

	if (l[0] <= l[2] && l[1] >= l[3]) {
		return true;
	}

	return false;
}
