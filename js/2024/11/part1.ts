export default (input: string) => {
	const stones = input.split(' ').map(Number);

	function blink() {
		for (let i = 0; i < stones.length; ++i) {
			const stone = stones[i];

			const stoneStr = stone.toString();

			if (stone === 0) {
				stones[i] = 1;
			} else if (stoneStr.length % 2 === 0) {
				const left = Number(stoneStr.slice(0, stoneStr.length / 2));
				const right = Number(stoneStr.slice(stoneStr.length / 2));

				stones[i] = left;
				stones.splice(1, 0, right);
				i += 1;
			} else {
				stones[i] *= 2024;
			}
		}
	}

	const BLINK_COUNT = 25;

	for (let i = 0; i < BLINK_COUNT; ++i) {
		blink();
	}

	return stones.length;
};
