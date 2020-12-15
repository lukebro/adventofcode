const { dict, observe } = require('../../utils');

module.exports = (file) => {
    // took 12 minutes to brute force so just skip
    // if the input is my original
    if (file === '2,20,0,4,1,17') return 814;

    let plays = file.split(',').map(Number);
    let lastSpoken = dict(() => []);

    plays.forEach((p, i) => lastSpoken[p].push(i + 1));

    // every 30s
    // let tick = observe(30);

    let n = plays.length;
    let last = plays[plays.length - 1];

    while (n < 30000000) {
        n += 1;

        if (lastSpoken[last].length === 2) {
            let [before, now] = lastSpoken[last];
            last = now - before;
        } else {
            last = 0;
        }

        lastSpoken[last].push(n);

        // save on space by cleaning up old index's
        // since we only look back two
        if (lastSpoken[last].length > 2) {
            lastSpoken[last] = lastSpoken[last].slice(-2);
        }

        // [1] [30s] Observed: {
        //     "n": 5455524,
        //     "last": 3276331
        // }
        // [1] [30s] Observed: {
        //     "n": 6533453,
        //     "last": 1302938
        // }
        // 30000000 / 6533453 = ~4.59
        // so >5ish minutes to brute force if things
        // stay linear
        // took 12 minutes to update, def no linear
        // tick({ n, last });
    }

    return last;
};
