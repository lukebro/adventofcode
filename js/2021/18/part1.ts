import { assert } from '@lib/utils';

type Node = {
	left: Node | number | null;
	right: Node | number | null;
	parent: Node | null;
};

const isPair = (node: Node) =>
	typeof node.left === 'number' && typeof node.right === 'number';

const convertToTree = (arr, parent = null) => {
	let [left, right] = arr;

	const node = createNode(parent);

	if (typeof left !== 'number') {
		left = convertToTree(left, node);
	}

	if (typeof right !== 'number') {
		right = convertToTree(right, node);
	}

	node.left = left;
	node.right = right;

	return node;
};

const searchAndExplode = (tree: Node, depth = 0): boolean => {
	const { left, right } = tree;

	if (depth === 4) {
		if (isPair(tree)) {
			explode(tree);

			return true;
		}
	}

	return (
		(typeof left !== 'number' && searchAndExplode(left, depth + 1)) ||
		(typeof right !== 'number' && searchAndExplode(right, depth + 1))
	);
};

const explode = (tree: Node): void => {
	const parent = tree.parent;
	const { left, right } = tree;

	assert(typeof left === 'number' && typeof right === 'number');

	carry(left, tree, 'left');
	carry(right, tree, 'right');

	if (parent.left === tree) {
		parent.left = 0;
	}

	if (parent.right === tree) {
		parent.right = 0;
	}
};

const carry = (value: number, pair: Node, direction: 'left' | 'right') => {
	let prev = pair;
	let node = pair.parent;

	let swapped = false;

	while (node !== null) {
		if (node[direction] === prev) {
			prev = node;
			node = node.parent;

			continue;
		}

		if (typeof node[direction] !== 'number') {
			prev = node;
			node = node[direction] as Node;

			if (!swapped) {
				direction = direction === 'left' ? 'right' : 'left';
				swapped = true;
			}

			continue;
		}

		node[direction] = <number>node[direction] + value;
		break;
	}
};

const searchAndSplit = (tree) => {
	const { left, right } = tree;

	const leftIsNum = typeof left === 'number';
	const rightIsNum = typeof right === 'number';

	if (leftIsNum && left >= 10) {
		const node = createNode(tree);

		node.left = Math.floor(left / 2);
		node.right = Math.ceil(left / 2);

		tree.left = node;

		return true;
	} else if (!leftIsNum) {
		if (searchAndSplit(left)) return true;
	}

	if (rightIsNum && right >= 10) {
		const node = createNode(tree);

		node.left = Math.floor(right / 2);
		node.right = Math.ceil(right / 2);

		tree.right = node;

		return true;
	} else if (!rightIsNum) {
		if (searchAndSplit(right)) return true;
	}
};

export const createNode = (parent = null, left = null, right = null): Node => {
	const node: Node = {
		left,
		right,
		parent,
	};

	if (left) {
		left.parent = node;
	}

	if (right) {
		right.parent = node;
	}

	return node;
};

export const magnitude = (node: Node): number => {
	let { left, right } = node;

	if (typeof left !== 'number') {
		left = magnitude(left);
	}

	if (typeof right !== 'number') {
		right = magnitude(right);
	}

	return 3 * <number>left + 2 * <number>right;
};

export const reduce = (tree: Node) => {
	while (searchAndExplode(tree));
	if (searchAndSplit(tree)) reduce(tree);
};

export const parse = (input: string): Node[] =>
	input.split('\n').map((line) => convertToTree(JSON.parse(line)));

export default (file: string): number => {
	const fish = parse(file);

	const result = fish.reduce((final, fish) => {
		const tree = createNode(null, final, fish);

		reduce(tree);

		return tree;
	});

	return magnitude(result);
};
