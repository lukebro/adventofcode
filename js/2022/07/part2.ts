import type { Directory } from './part1';
import { createFilesystem } from './part1';

export default (file: string) => {
	const fs = createFilesystem(file);
	const NEED = 30000000 - (70000000 - fs.size);

	const options: Directory[] = [];

	function findOptions(dir: Directory) {
		if (dir.size < NEED) {
			return;
		}

		options.push(dir);

		for (const stat of dir.children) {
			if (stat.type === 'dir') {
				findOptions(stat);
			}
		}
	}

	findOptions(fs);

	return options.sort((a, b) => a.size - b.size)[0].size;
};
