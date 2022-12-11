export default (file: string) => {
	const fs: Directory = createFilesystem(file);
	const MAX = 100000;

	function solve(dir: Directory) {
		let total = 0;

		for (const stat of dir.children) {
			if (stat.type !== 'dir') {
				continue;
			}

			if (stat.size <= MAX) {
				total += stat.size;
			}

			total += solve(stat);
		}

		return total;
	}

	return solve(fs);
};

export type Directory = {
	type: 'dir';
	name: string;
	size: number;
	parent: null | Directory;
	children: (File | Directory)[];
};

export type File = {
	type: 'file';
	name: string;
	size: number;
	parent: Directory;
};
export function createFilesystem(file: string): Directory {
	const lines = file.split('\n');

	const fs = createDirectory(null, '/');
	let cwd = fs;

	for (const line of lines) {
		const parts = line.split(' ');

		// handle commands
		if (line[0] === '$') {
			if (parts[1] === 'cd') {
				const arg = parts[2];

				if (arg === '..') {
					cwd = cwd.parent ? cwd.parent : fs;
				} else if (arg === '/') {
					cwd = fs;
				} else {
					cwd = createDirectory(cwd, arg);
				}
			}

			// ls command is useless in how we parse
			continue;
		}

		if (parts[0] === 'dir') {
			createDirectory(cwd, parts[1]);
		} else {
			createFile(cwd, parts[1], Number(parts[0]));
		}
	}

	calculateDirectorySizes(fs);

	return fs;
}

export function calculateDirectorySizes(fs: Directory) {
	let total = 0;

	for (const stat of fs.children) {
		if (stat.type === 'dir') {
			calculateDirectorySizes(stat);
		}

		total += stat.size;
	}

	fs.size = total;
}

export function createDirectory(root, name): Directory {
	const dir: Directory = {
		type: 'dir',
		name,
		size: -1,
		children: [],
		parent: root,
	};
	root && root.children.push(dir);

	return dir;
}

export function createFile(root, name, size): File {
	const file: File = { type: 'file', name, size, parent: root };
	root && root.children.push(file);

	return file;
}
