import assert from 'assert';
import { findall } from '../../lib/utils';

export default (input: string) => {
	const lines = input.split('\n');

	const listA = [];
	const listB = [];

	for (const line of lines) {
		const [a, b] = findall(/(\d+)\s+(\d+)/g, line).map(Number);

		listA.push(a);
		listB.push(b);
	}

	listA.sort((a, b) => a - b);
	listB.sort((a, b) => a - b);

	assert(listA.length === listB.length);

	let distance = 0;
	for (let i = 0; i < listA.length; i++) {
		distance += Math.abs(listA[i] - listB[i]);
	}

	return distance;
};
