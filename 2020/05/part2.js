module.exports = (input) => {
    input = input.split('\n').map((i) => {
        let [, r, c] = i.match(/^([FB]{7})([LR]{3})$/);

        return [r, c];
    });
    let seats = [];

    for (let seat of input) {
        let [r, c] = seat;

        let top = 127;
        let bottom = 0;

        for (let i = 0; i < r.length; i++) {
            let a = r[i];
            let diff = Math.ceil((top - bottom) / 2);

            if (a === 'F') {
                top -= diff;
            } else if (a === 'B') {
                bottom += diff;
            }
        }
        let row = top;

        top = 7;
        bottom = 0;

        for (let i = 0; i < r.length; i++) {
            let a = c[i];
            let diff = Math.ceil((top - bottom) / 2);

            if (a === 'L') {
                top -= diff;
            } else if (a === 'R') {
                bottom += diff;
            }
        }

        let col = top;

        seats.push(row * 8 + col);
    }

    seats = seats.sort((a, b) => a - b);
    let mySeat = null;

    for (let i = 1; i < seats.length - 1; i++) {
        let cur = seats[i];

        if (cur + 1 !== seats[i + 1]) {
            mySeat = cur + 1;
            break;
        } else if (cur - 1 !== seats[i - 1]) {
            mySeat = cur - 1;
            break;
        }
    }

    return mySeat;
};
