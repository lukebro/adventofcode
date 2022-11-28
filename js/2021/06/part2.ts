import { sum } from '@lib/utils';

// for part 2 I realized I don't need to count
// individual fishes but I can group
// and count by current age
export default (file: string) => {
	const fish = file.split(',').map((n) => parseInt(n, 10));
	const ages = Array(9).fill(0);

	// initialize initial counts per age
	for (let f of fish) {
		ages[f] += 1;
	}

	function progress(ages, days) {
		for (let day = 0; day < days; day++) {
			const zeros = ages.shift();

			// this is our 8s
			ages.push(zeros);

			// parents go to age 6
			ages[6] += zeros;
		}
	}

	progress(ages, 256);

	return sum(ages);
};
