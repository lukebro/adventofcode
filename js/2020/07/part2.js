module.exports = (lines) => {
	const bags = lines.split('\n').reduce((bags, i) => {
		let matches = i.match(/(\d )?\w+ (\w+) bag/g);

		matches = matches.map((i) => {
			let [, count, color] = i.match(/(\d)? ?(\w+ \w+) bag/);

			return { count: (count && +count) || null, color: color };
		});

		let children = matches.splice(1);

		if (children.length === 1 && children[0].count === null) {
			children = [];
		}

		let parent = matches[0].color;

		bags[parent] = bags[parent] || [];
		bags[parent].push(...children);

		return bags;
	}, {});
	let count = 0;

	let gold = bags['shiny gold'];

	let countThem = (b, multipler) => {
		for (let bag of b) {
			count += bag.count * multipler;

			countThem(bags[bag.color], bag.count * multipler);
		}
	};

	countThem(gold, 1);

	return count;
};
