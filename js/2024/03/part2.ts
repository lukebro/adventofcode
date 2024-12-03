import { findall } from '../../lib/utils';

export default (input: string) => {
	const all = findall(/(don\'t\(\))|(do\(\))|(mul\((\d+),(\d+)\))/g, input);

	let total = 0;
	let shouldDo = true;

	for (let i = 0; i < all.length; i++) {
		let [no, yes, full, a, b] = all[i];

		if (shouldDo && full) {
			a = Number(a);
			b = Number(b);
			total += a * b;
		} else {
			if (yes) {
				shouldDo = true;
			} else if (no) {
				shouldDo = false;
			}
		}
	}

	return total;
};
