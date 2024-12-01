import { findall } from '@lib/utils';

export function parse(input: string) {
	return input.split('\n').map((line) => {
		const [card, other] = findall(/Card\s+(\d+): (.*)/g, line);
		const [winning, input] = other.split('|');

		return {
			card: Number(card),
			winning: winning.match(/\d+/g).map(Number),
			input: input.match(/\d+/g).map(Number),
		};
	});
}

export default (input: string) => {
	const lines = parse(input);

	let points = 0;

	for (const { card, winning, input } of lines) {
		let add = 0;
		for (const win of winning) {
			if (input.includes(win)) {
				add = add === 0 ? 1 : add * 2;
			}
		}

		points += add;
	}

	return points;
};
