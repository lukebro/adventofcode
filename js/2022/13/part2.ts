import { checkOrder } from './part1';

export default (file: string) => {
	let input = file.split('\n').filter((l) => l !== '');
	input.push('[[2]]', '[[6]]');

	let packets = input.map((p) => JSON.parse(p));

	packets.sort((a, b) => {
		return checkOrder(a, b) ? -1 : 1;
	});

	const check = (num) => (p) => {
		return p.length === 1 && p[0].length === 1 && p[0][0] === num;
	};

	return (packets.findIndex(check(2)) + 1) * (packets.findIndex(check(6)) + 1);
};
