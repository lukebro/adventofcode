// export const input = 'example.txt';

export default (input: string) => {
	const map = input.split('');

	const disk: number[] = [];
	let file = true;
	let id = 0;
	for (let i = 0; i < map.length; ++i) {
		let num = Number(map[i]);

		for (let j = 0; j < num; ++j) {
			if (file) {
				disk.push(id);
			} else {
				disk.push(-1);
			}
		}

		if (file) {
			id += 1;
		}

		file = !file;
	}

	let left = 0;
	let right = disk.length - 1;

	function insert(index: number, length: number, value: number) {
		for (let i = 0; i < length; ++i) {
			disk[index + i] = value;
		}
	}

	// debug(disk, 0, 1);

	// compress
	while (left < right) {
		while (disk[right] === -1) {
			right -= 1;
		}

		const moving = disk[right];
		let length = 0;
		while (disk[right] === moving) {
			length += 1;
			right -= 1;
		}

		let dest = 0;

		while (left <= right && dest !== length) {
			if (disk[left] === -1) {
				dest += 1;
			} else {
				dest = 0;
			}

			left += 1;
		}

		if (dest === length) {
			insert(left - length, length, moving);
			insert(right + 1, length, -1);
		}

		left = 0;

		while (disk[left] !== -1) {
			left += 1;
		}

		// debug(disk, left, right);
	}

	// debug(disk, left, right);
	let checksum = 0;

	for (let i = 0; i < disk.length; ++i) {
		if (disk[i] === -1) {
			continue;
		}

		checksum += disk[i] * i;
	}

	return checksum;
};

function debug(ah: any[], left, right) {
	process.stdout.write('\n');
	for (let i = 0; i <= Math.max(left, right); ++i) {
		let char = ' ';
		if (i === left) char = 'l';

		if (i === right) char = 'r';

		process.stdout.write(char);
	}

	process.stdout.write('\n');

	console.log(ah.map((n) => (n === -1 ? '.' : n)).join(''));
}
