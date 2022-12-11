import { findall } from '@lib/utils';

export default (file: string) => {
	let monkeys = parse(file);

	const worry = (x) => Math.floor(x / 3);

	for (let i = 0; i < 20; ++i) {
		playRound(monkeys, takeTurn, worry);
	}

	monkeys = monkeys.sort((a, b) => b.inspections - a.inspections);

	return monkeys[0].inspections * monkeys[1].inspections;
};

export function playRound(monkeys, takeTurn, worry) {
	for (let i = 0; i < monkeys.length; ++i) {
		takeTurn(monkeys[i], monkeys, worry);
	}
}

export function takeTurn(monkey, monkeys, worry) {
	const length = monkey.items.length;

	for (let i = 0; i < length; ++i) {
		const item = monkey.items.shift();
		monkey.inspections += 1;

		const nextItem = worry(inspect(item, monkey.operation));
		monkeys[
			nextItem % monkey.test === 0 ? monkey.success : monkey.failure
		].items.push(nextItem);
	}
}

export function inspect(item, operation) {
	const [left, op, right] = operation;

	// old ? old
	if (left === right) {
		if (op === '*') {
			return item * item;
		}

		return item + item;
	}

	// old ? _
	if (left === 'old') {
		if (op === '*') {
			return item * right;
		}

		return item + right;
	}

	// _ ? _
	if (op === '*') {
		return left * right;
	}

	return left + right;
}

export function parse(file: string) {
	const monkeys = file.split('\n\n').map((monkey, id) => {
		const lines = monkey.split('\n').map((line) => line.trim());

		let items = findall(/(\d+)/, lines[1]);
		items = Array.isArray(items) ? items : [items];
		items = items.map(Number);

		const [, o] = lines[2].split(' = ');
		const operation: any = o.split(' ').map((x) => {
			const num = Number(x);
			return isNaN(num) ? x : num;
		});

		const test: any = Number(findall(/(\d+)/, lines[3]));
		const success = Number(findall(/(\d+)/, lines[4]));
		const failure = Number(findall(/(\d+)/, lines[5]));

		return { id, inspections: 0, items, operation, test, success, failure };
	});

	return monkeys;
}
