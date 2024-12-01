import { findall } from '../../lib/utils';

export default (input: string) => {
	const lines = input.split('\n');

	const listA = [];
	const listB = new Map<number, number>();

	for (const line of lines) {
		const [a, b] = findall(/(\d+)\s+(\d+)/g, line).map(Number);

		listA.push(a);

		if (listB.has(b)) {
			listB.set(b, listB.get(b) + 1);
		} else {
			listB.set(b, 1);
		}
	}

	let similarity = 0;
	for (let i = 0; i < listA.length; i++) {
		const num = listA[i];

		if (listB.has(num)) {
			similarity += num * listB.get(num);
		}
	}

	return similarity;
};
