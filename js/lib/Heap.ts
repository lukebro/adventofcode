interface Iterable<T> {
	[Symbol.iterator](): Iterator<T>;
}

interface ICompare extends Function {
	(a: any, b: any): number;
}

export default class Heap<T> {
	heap: T[];
	compare: ICompare;

	constructor();
	constructor(iterable?: Iterable<T> | ICompare);
	constructor(iterable?: Iterable<T>, compare?: ICompare) {
		if (typeof iterable === 'function' && compare == null) {
			compare = <ICompare>iterable;
			iterable = null;
		}

		if (iterable && typeof iterable[Symbol.iterator] !== 'function') {
			throw `Initial heap value must be iterable`;
		}

		this.heap = [];
		this.compare = compare || defaultCompare;

		if (iterable) for (const node of <Iterable<T>>iterable) this.push(node);
	}

	push(node: T): void {
		const index = this.heap.length;
		this.heap.push(node);
		siftUp(this.heap, node, index, this.compare);
	}

	peek(): T | null {
		return this.heap.length === 0 ? null : this.heap[0];
	}

	pop(): T | null {
		if (this.heap.length === 0) {
			return null;
		}

		const first = this.heap[0];
		const last = this.heap.pop();

		if (first !== last) {
			this.heap[0] = last;
			siftDown(this.heap, last, 0, this.compare);
		}

		return first;
	}

	get size(): number {
		return this.heap.length;
	}
}

function defaultCompare(a: number, b: number): number {
	return a - b;
}

function siftUp<T>(heap: T[], node: T, i: number, compare: ICompare) {
	let index = i;
	while (index > 0) {
		const parentIndex = (index - 1) >>> 1;
		const parent = heap[parentIndex];
		if (compare(parent, node) > 0) {
			heap[parentIndex] = node;
			heap[index] = parent;
			index = parentIndex;
		} else {
			return;
		}
	}
}

function siftDown<T>(heap: T[], node: T, i: number, compare: ICompare) {
	let index = i;
	const length = heap.length;
	const halfLength = length >>> 1;
	while (index < halfLength) {
		const leftIndex = (index + 1) * 2 - 1;
		const left = heap[leftIndex];
		const rightIndex = leftIndex + 1;
		const right = heap[rightIndex];

		if (compare(left, node) < 0) {
			if (rightIndex < length && compare(right, left) < 0) {
				heap[index] = right;
				heap[rightIndex] = node;
				index = rightIndex;
			} else {
				heap[index] = left;
				heap[leftIndex] = node;
				index = leftIndex;
			}
		} else if (rightIndex < length && compare(right, node) < 0) {
			heap[index] = right;
			heap[rightIndex] = node;
			index = rightIndex;
		} else {
			return;
		}
	}
}
