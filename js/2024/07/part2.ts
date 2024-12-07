export default (input: string) => {
	const equations = input.split('\n').map((line) => {
		const [sum, remainder] = line.split(': ');

		return { sum: Number(sum), remainder: remainder.split(' ').map(Number) };
	});

	function solve(equation: (number | string)[]): number {
		let sum = equation[0] as number;
		let op = '+';

		for (let i = 1; i < equation.length; ++i) {
			const part = equation[i]!;

			if (typeof part === 'number') {
				if (op === '+') {
					sum += part;
				} else if (op === '*') {
					sum *= part;
				} else {
					sum = Number(`${sum}${part}`);
				}
			} else {
				op = part;
			}
		}

		return sum;
	}

	// can use dp to speed this up

	function permutations(
		sum: number,
		remainder: number[],
		current: (number | string)[],
	) {
		if (remainder.length === 0) {
			return sum === solve(current);
		}

		const next = remainder.shift();

		return (
			permutations(sum, remainder.slice(), [...current, '+', next]) ||
			permutations(sum, remainder.slice(), [...current, '*', next]) ||
			permutations(sum, remainder.slice(), [...current, '|', next])
		);
	}

	let total = 0;
	for (const equation of equations) {
		const first = equation.remainder.shift();

		if (permutations(equation.sum, equation.remainder.slice(), [first])) {
			total += equation.sum;
		}
	}

	return total;
};
