import { findall } from '@lib/utils';

export default (file: string) => {
	const [messageInput, testInput] = file.split('\n\n');

	const tests = testInput.split('\n');

	const messages = messageInput.split('\n').reduce((key, m) => {
		const [index, value] = m.split(': ');

		key[index] = value;
		return key;
	}, {});

	// RangeError: Maximum call stack size exceeded
	// messages['8'] = '42 | 42 8';
	// messages['11'] = '42 31 | 42 11 31';

	const solve = (index) => {
		const message = messages[index];

		const value = findall(/\"([ab])\"/g, message);

		if (value.length !== 0) {
			return value;
		}

		let [left, right] = message.split(' | ');

		left = left.split(' ').map(solve).join('');

		if (right) {
			left += '|' + right.split(' ').map(solve).join('');
		}

		return `(${left})`;
	};

	const regex = new RegExp(`^${solve('0')}$`, 'g');
	let count = 0;
	for (let test of tests) {
		if (test.match(regex)) {
			count += 1;
			console.log('match: ', test);
		}
	}

	return count;
};

export const input = 'example.txt';
