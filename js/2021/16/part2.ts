import { pad } from '@lib/utils';
import { createBitScanner, parseNextPacket, Packet } from './part1';

const getValue = (packet: Packet): number => {
	const type = packet.type;

	if (type === 4) {
		return packet.value;
	}

	const subpackets = packet.subpackets;

	switch (type) {
		case 0:
			return subpackets.reduce((sum, packet) => sum + getValue(packet), 0);

		case 1:
			return subpackets.reduce(
				(product, packet) => product * getValue(packet),
				1,
			);

		case 2:
			return Math.min(...subpackets.map(getValue));

		case 3:
			return Math.max(...subpackets.map(getValue));

		case 5:
			return getValue(subpackets[0]) > getValue(subpackets[1]) ? 1 : 0;

		case 6:
			return getValue(subpackets[0]) < getValue(subpackets[1]) ? 1 : 0;

		case 7:
			return getValue(subpackets[0]) === getValue(subpackets[1]) ? 1 : 0;

		default:
			throw `Unknown packet type: ${type}`;
	}
};

export default (file: string) => {
	let bits = file
		.split('')
		.map((hex) => {
			const str = parseInt(hex, 16).toString(2);

			return pad(str, 4);
		})
		.join('');

	const next = createBitScanner(bits);
	const packets: Packet[] = [];

	while (next.state.hasMore) {
		packets.push(parseNextPacket(next));
	}

	let outerValue = 0;

	for (const packet of packets) {
		outerValue += getValue(packet);
	}

	return outerValue;
};
