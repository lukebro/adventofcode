import { getMessage, parse } from './part1';

export default (file: string) => {
	const [buckets, commands] = parse(file);

	for (const command of commands) {
		exec9001(buckets, command);
	}

	return getMessage(buckets);
};

function exec9001(buckets, command) {
	const items = [];

	for (let i = 0; i < command.move; ++i) {
		items.unshift(buckets[command.from].pop());
	}

	items.forEach((item) => {
		buckets[command.to].push(item);
	});
}
