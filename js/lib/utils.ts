import assert from 'assert';
import { performance } from 'perf_hooks';

export { default as Heap } from './Heap';
export { assert };

export const difference = (a: any[], b: any[]) => {
	b = Array.from(b);
	return Array.from(a).filter((x) => !b.includes(x));
};

export const sum = (arr: number[]) => {
	return arr.reduce((acc, n) => acc + n, 0);
};

export const product = (arr: number[]): number => {
	return arr.reduce((acc, n) => acc * n, 1);
};

export const isSetEqual = <T>(a: Set<T>, b: Set<T>): boolean => {
	if (a.size !== b.size) {
		return false;
	}

	for (const i of a) {
		if (!b.has(i)) return false;
	}

	return true;
};

export const findall = (regex: RegExp, str: string) => {
	let hits = [];
	let match;

	// we need g flag for exec to continue
	// to loop.. so incase i forget
	regex = new RegExp(regex, 'g');

	while ((match = regex.exec(str)) !== null) {
		let results = match.length === 1 ? match : match.splice(1);
		// if we have only one capture group
		if (results.length === 1) {
			hits.push(results[0]);
		} else {
			hits.push(results);
		}
	}

	if (hits.length === 1) {
		return hits[0];
	}

	return hits;
};

export const pad = (
	str: string,
	length: number,
	char: string = '0',
): string => {
	while (str.length < length) {
		str = char + str;
	}

	return str;
};

export const mod_inverse = (a: any, b: any) => {
	let b0 = b;
	let x0 = 0n;
	let x1 = 1n;

	if (b === 1n) return 1n;

	while (a > 1n) {
		let q = a / b;
		let temp = a;
		a = b;
		b = temp % b;
		temp = x0;
		x0 = x1 - BigInt(q) * x0;
		x1 = temp;
	}

	if (x1 < 0n) {
		x1 += b0;
	}

	return x1;
};

// http://rosettacode.org/wiki/Chinese_remainder_theorem
// where n = list of mods and a is list of remainders
export const crt = (n: bigint[], a: bigint[]) => {
	let prod = n.reduce((a, c) => a * c, 1n);
	let sum = 0n;

	for (let i = 0; i < n.length; i++) {
		let p = prod / n[i];
		sum += a[i] * mod_inverse(p, n[i]) * BigInt(p);
	}

	return sum % prod;
};

/**
 * For long running calculations, this is useful
 * to monitor a value every (x) seconds.  Tick needs
 * to be manually called in the loop since the event loop
 * will be blocked :(
 */
let uniqId = 0;
export const observe = (timeInSec: number = 5): Function => {
	let time = performance.now();
	let sleep = timeInSec * 1000;
	let interval = 0;
	let id = ++uniqId;

	console.log(`[${id}][0s] Observing every ${timeInSec} seconds`);

	let tick = (value: any) => {
		let now = performance.now();
		if (now - time < sleep) return;
		interval += 1;
		time = now;
		console.log(
			`[${id}][${interval * timeInSec}s] Observed: ${JSON.stringify(
				value,
				null,
				4,
			)}`,
		);
	};

	return tick;
};

export const permutations = <T>(
	values: T[],
	{
		size,
		repeat = false,
	}: {
		size?: number;
		repeat?: boolean;
	} = {},
): T[][] => {
	if (!size) {
		size = values.length;
	}

	const result = [];

	const generate = (options = [], current = []) => {
		if (current.length >= size) {
			result.push(current);
			return;
		}

		for (let i = 0; i < options.length; i++) {
			const next = current.slice();

			if (repeat) {
				next.push(options[i]);
				generate(options, next);
			} else {
				const nextOptions = options.slice();
				next.push(nextOptions[i]);
				nextOptions.splice(i, 1);
				generate(nextOptions, next);
			}
		}
	};

	generate(values);

	return result;
};

export const euclidean = (one: number[], two: number[]): number => {
	assert(one.length === two.length);

	let result = 0;

	for (let i = 0; i < one.length; ++i) {
		result += Math.pow(two[i] - one[i], 2);
	}

	return Math.sqrt(result);
};

export const manhattan = (one: number[], two: number[]): number => {
	assert(one.length === two.length);

	let result = 0;

	for (let i = 0; i < one.length; ++i) {
		result += Math.abs(two[i] - one[i]);
	}

	return result;
};

type MemoizedFunc = {
	(...any): any;
	cache: Map<String, any>;
};

export const memoize = (
	fn: (...args) => any,
	resolver?: (...args) => any,
): MemoizedFunc => {
	const memoized = function (...args) {
		const key = resolver ? resolver.apply(this, args) : args.join('~');
		const cache = memoized.cache;

		if (cache.has(key)) {
			return cache.get(key);
		}

		const result = fn.apply(this, args);
		cache.set(key, result);

		return result;
	};

	memoized.cache = new Map();

	return memoized;
};
