const { dict } = require('../../utils');

module.exports = (file) => {
    let plays = file.split(',').map(Number);
    let lastSpoken = dict(() => []);

    plays.forEach((p, i) => lastSpoken[p].push(i + 1));

    let n = plays.length;
    let last = plays[plays.length - 1];

    while (n < 2020) {
        n += 1;

        if (lastSpoken[last].length > 1) {
            let spoken = lastSpoken[last];
            let len = spoken.length;
            last = spoken[len - 1] - spoken[len - 2];
        } else {
            last = 0;
        }

        lastSpoken[last].push(n);
    }

    return last;
};
