function parse(input) {
    input = input.split('\n');

    return input.reduce((bags, i) => {
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
}

function solve(bags) {
    let hasGold = (color) => {
        if (!bags[color]) {
            return false;
        }

        for (let i = 0; i < bags[color].length; i++) {
            let c = bags[color][i].color;

            if (c === 'shiny gold') {
                return true;
            }

            if (hasGold(c)) {
                return true;
            }
        }

        return false;
    };

    let shinyGold = 0;

    for (let color in bags) {
        if (hasGold(color)) shinyGold += 1;
    }

    return shinyGold;
}

module.exports = {
    solve,
    parse,
};
