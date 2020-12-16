module.exports = (file, max = 2020) => {
    let plays = file.split(',').map(Number);
    let lastSpoken = new Map();

    plays.forEach((p, i) => lastSpoken.set(p, [i + 1]));

    let start = plays.length;
    let last = plays[start - 1];

    for (let n = start + 1; n <= max; n++) {
        let spoken = lastSpoken.get(last);

        if (spoken.length === 2) {
            last = spoken[1] - spoken[0];
        } else {
            last = 0;
        }

        if (lastSpoken.has(last)) {
            spoken = lastSpoken.get(last);
        } else {
            spoken = [];
            lastSpoken.set(last, spoken);
        }

        spoken.push(n);

        if (spoken.length === 3) {
            spoken.shift();
        }
    }

    return last;
};
