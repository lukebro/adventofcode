import { parse, playRound, takeTurn } from './part1';

export default (file: string) => {
	let monkeys = parse(file);

	const mod = monkeys.reduce((mod, monkey) => mod * monkey.test, 1);
	const worry = (x) => x % mod;

	for (let i = 0; i < 10_000; ++i) {
		playRound(monkeys, takeTurn, worry);
	}

	monkeys = monkeys.sort((a, b) => b.inspections - a.inspections);

	return monkeys[0].inspections * monkeys[1].inspections;
};
