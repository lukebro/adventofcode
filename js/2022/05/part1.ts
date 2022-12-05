import { findall } from '@lib/utils';

export default (file: string) => {
	const [buckets, commands] = parse(file);

	for (const command of commands) {
		exec9000(buckets, command);
	}

	return getMessage(buckets);
};

function exec9000(buckets, command) {
	for (let i = 0; i < command.move; ++i) {
		const item = buckets[command.from].pop();
		buckets[command.to].push(item);
	}
}

export function getMessage(buckets) {
	let result = '';

	for (const bucket of buckets) {
		result += bucket[bucket.length - 1];
	}

	return result;
}

export function parse(file: string) {
	const [i, c] = file.split('\n\n');
	const bucketLines = i.split('\n');
	const commandLines = c.split('\n');

	// parse initial buckets
	const b = findall(/(\d+)/, bucketLines[bucketLines.length - 1]);
	const numOfBuckets = parseInt(b[b.length - 1], 10);
	const buckets = Array.from({ length: numOfBuckets }, () => []);
	for (const line of bucketLines) {
		// we basically move by whitespaces:
		//  1   2   3
		for (let x = 1; x <= line.length; x += 4) {
			if (line[x] === ' ') {
				continue;
			}

			buckets[(x - 1) / 4].unshift(line[x]);
		}
	}

	// parse commands
	const commands = [];
	for (const line of commandLines) {
		const [move, from, to] = findall(
			/move (\d+) from (\d+) to (\d+)/,
			line,
		).map(Number);

		commands.push({
			move,
			from: from - 1,
			to: to - 1,
		});
	}

	return [buckets, commands];
}
