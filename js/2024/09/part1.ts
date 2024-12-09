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

	// compress
	while (true) {
		while (disk[right] === -1) {
			right -= 1;
		}

		while (disk[left] !== -1) {
			left += 1;
		}

		if (left >= right) {
			break;
		}

		disk[left] = disk[right];
		disk[right] = -1;
	}

	disk.length = left;

	// checksum
	let checksum = 0;

	for (let i = 0; i < disk.length; ++i) {
		checksum += disk[i] * i;
	}

	return checksum;
};
