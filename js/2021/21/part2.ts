import { sum, permutations } from '@lib/utils';
import { score } from './part1';

const cache = new Map();
function key(...args) {
	return `${args.join('~')}`;
}

const split = (freq, turn, positions, scores) => {
	const k = key(turn, positions, scores);

	if (cache.has(k)) {
		return cache.get(k);
	}

	let [scoreOne, scoreTwo] = scores;

	if (scoreOne >= 21) {
		return [1, 0];
	} else if (scoreTwo >= 21) {
		return [0, 1];
	}

	const wins = [0, 0];
	for (const z in freq) {
		const roll = parseInt(z, 10);
		const ways = freq[roll];

		let [scoreOne, scoreTwo] = scores;
		let [positionOne, positionTwo] = positions;

		if (turn) {
			positionOne = score(positionOne, roll);
			scoreOne += positionOne;
		} else {
			positionTwo = score(positionTwo, roll);
			scoreTwo += positionTwo;
		}

		const [winsOne, winsTwo] = split(
			freq,
			!turn,
			[positionOne, positionTwo],
			[scoreOne, scoreTwo],
		);

		wins[0] += ways * winsOne;
		wins[1] += ways * winsTwo;
	}

	cache.set(k, wins);

	return wins;
};

export default (file: string) => {
	const starting = file
		.split('\n')
		.map((line) => parseInt(line.match(/(\d+)/g)[1], 10));

	const positions = [...starting];

	const rolls = permutations([1, 2, 3], { repeat: true });
	const freq = {};
	for (const roll of rolls) {
		const k = sum(roll);
		freq[k] = (freq[k] || 0) + 1;
	}

	return Math.max(...split(freq, true, positions, [0, 0]));
};
