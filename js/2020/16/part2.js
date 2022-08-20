const { findall } = require('@lib/utils');

module.exports = (file) => {
    let [rules, mine, nearby] = file.split('\n\n');

    rules = rules.split('\n').map((rule) => {
        let [name, ...ranges] = findall(
            /(.*): (\d+)-(\d+) or (\d+)-(\d+)/g,
            rule,
        );

        return [name, ...ranges.map(Number)];
    });

    let range = [];

    let rangeByName = new Map();

    // mark range of array to represent range of
    // acceptable values
    let markRange = (range, from, to) => {
        for (let i = from; i <= to; i++) {
            range[i] = 1;
        }
    };

    for (let rule of rules) {
        let [name, min1, max1, min2, max2] = rule;

        // this marks our general range
        // to filter out bad tickets
        // yes i can probably do only other labeled ranges but w/e
        markRange(range, min1, max1);
        markRange(range, min2, max2);

        let specificRange;

        if (rangeByName.has(name)) {
            specificRange = rangeByName.get(name);
        } else {
            specificRange = [];
            rangeByName.set(name, specificRange);
        }

        // this filters our specific ranges based on label
        markRange(specificRange, min1, max1);
        markRange(specificRange, min2, max2);
    }

    nearby = nearby
        .replace('nearby tickets:\n', '')
        .split('\n')
        .map((l) => l.split(',').map(Number));

    // filter bad tickets
    nearby = nearby.filter((ticket) => {
        for (let n of ticket) {
            if (!range[n]) return false;
        }

        return true;
    });

    // Now we're going to solve for columns
    let len = nearby[0].length;
    let labels = Array.from(rangeByName.keys());
    let columns = Array.from({ length: len }, () => [...labels]);

    // we're going to narrow the column possibilities
    // now by looping and removing labels from columns that
    // don't meet ticket.. by the end we should have our columns
    for (let ticket of nearby) {
        for (let i = 0; i < len; i++) {
            let column = columns[i];
            let n = ticket[i];

            // we know this column is it
            if (column.length === 1) {
                continue;
            }

            for (let j = column.length - 1; j >= 0; j--) {
                let range = rangeByName.get(column[j]);

                // if it fullfill the range for that label
                // this label can't be it for the column
                if (!range[n]) {
                    column.splice(j, 1);
                }
            }
        }
    }

    let dedupeColumns = (name) => {
        for (let column of columns) {
            if (column.length === 1) continue;

            let idx = column.indexOf(name);

            if (idx > -1) column.splice(idx, 1);
        }
    };

    // solve the columns by getting rid of duplicates
    // ie [ [row], [row, class] ], we know it's [row, class]
    while (columns.flat().length !== len) {
        for (let column of columns) {
            if (column.length === 1) {
                dedupeColumns(column[0]);
            }
        }
    }

    columns = columns.flat();

    let myTicket = mine.replace('your ticket:\n', '').split(',').map(Number);
    let answer = 1;

    for (let i = 0; i < len; i++) {
        let column = columns[i];

        if (column.startsWith('departure')) {
            let n = myTicket[i];
            answer *= n;
        }
    }

    return answer;
};
