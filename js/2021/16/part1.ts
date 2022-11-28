import { pad } from '@lib/utils';

export type ScannerState = {
	/**
	 * Cursor to position in bit array
	 */
	i: number;

	/**
	 * True when more bits can be scanned
	 */
	hasMore: boolean;
};

/**
 * Scan bits
 */
export interface BitScanner {
	(length: number, raw?: undefined): number;
	(length: number, raw: 1): string;
	state: ScannerState;
}

export type PacketType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * Packet which contains a literal value
 */
export type LiteralValuePacket = {
	version: number;
	type: Extract<PacketType, 4>;
	value: number;
	length: number;
};

export type OperatorPacket = {
	version: number;
	type: Exclude<PacketType, 4>;
	length: number;
	subpackets: Packet[];
};

export type Packet = LiteralValuePacket | OperatorPacket;

export const createBitScanner = (bits: string): BitScanner => {
	const len = bits.length;
	const state = { i: 0, hasMore: true };

	const next = <BitScanner>function (length, raw) {
		if (!state.hasMore) {
			return null;
		}

		let result = bits.slice(state.i, state.i + length);
		state.i += length;

		// 11 is min bits a packet can have, 3 + 3 + 5 (literal)
		if (
			state.i >= len ||
			(len - state.i <= 11 && parseInt(bits.slice(state.i, len), 2) === 0)
		) {
			state.hasMore = false;
		}

		if (!raw) {
			return parseInt(result, 2);
		}

		return result;
	};

	next.state = state;

	return next;
};

export const parseNextPacket = (next: BitScanner): Packet => {
	const start = next.state.i;
	const version = next(3);
	const type = next(3);

	if (type === 4) {
		let run = 1;
		let literal = '';

		while (run) {
			const bits = next(5, 1);
			literal += bits.slice(-4);
			run = parseInt(bits[0], 2);
		}

		const value = parseInt(literal, 2);

		return {
			version,
			type,
			value,
			length: next.state.i - start,
		} as LiteralValuePacket;
	}

	const lengthType = next(1);
	const subpackets: Packet[] = [];

	if (lengthType) {
		let count = next(11);

		while (count > 0) {
			subpackets.push(parseNextPacket(next));
			count -= 1;
		}

		return {
			version,
			type,
			subpackets,
			length: next.state.i - start,
		} as OperatorPacket;
	}

	const end = next(15) + next.state.i;

	while (next.state.i < end) subpackets.push(parseNextPacket(next));

	return {
		version,
		type,
		subpackets,
		length: next.state.i - start,
	} as OperatorPacket;
};

export const sumVersions = (packets: Packet[]) => {
	let count = 0;

	for (const packet of packets) {
		count += sumRecurse(packet);
	}

	return count;
};

function sumRecurse(packet: Packet) {
	let count = packet.version;

	if (!('subpackets' in packet)) {
		return count;
	}

	for (const subpacket of packet.subpackets) {
		count += sumRecurse(subpacket);
	}

	return count;
}

export default (file: string) => {
	let bits = file
		.split('')
		.map((hex) => {
			const str = parseInt(hex, 16).toString(2);

			return pad(str, 4);
		})
		.join('');

	const next = createBitScanner(bits);
	const packets = [];
	while (next.state.hasMore) {
		packets.push(parseNextPacket(next));
	}

	return sumVersions(packets);
};
