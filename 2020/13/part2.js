module.exports = (file) => {
    let lines = file.split('\n');
    let busIds = lines[1].split(',').map((x) => (x === 'x' ? x : BigInt(x)));

    // solve system of linear congruences using crt

    // AHHHH this problem hits JS's Number.MAX_SAFE_INTEGER
    // so after pulling my hair out for an hour I realized I have to convert everything to BigInt

    let remainders = [];
    let mods = [];
    for (let i = 0; i < busIds.length; i++) {
        let id = busIds[i];

        if (id === 'x') {
            continue;
        }

        // console.log(`x = ${id - i} (mod ${id})`);

        remainders.push(id - BigInt(i));
        mods.push(id);
    }

    const modulo_inverse = (a, b) => {
        let b0 = b;
        let x0 = 0n;
        let x1 = 1n;

        if (b === 1n) return 1n;

        while (a > 1n) {
            let q = a / b;
            let temp = a;
            a = b;
            b = temp % b;
            temp = x0;
            x0 = x1 - q * x0;
            x1 = temp;
        }

        if (x1 < 0n) {
            x1 += b0;
        }

        return x1;
    };

    // http://rosettacode.org/wiki/Chinese_remainder_theorem
    // where n = list of mods and a is list of remainders
    const chinese_remainder = (n, a) => {
        let prod = n.reduce((a, c) => a * c, 1n);
        let sum = 0n;

        for (let i = 0; i < n.length; i++) {
            let p = prod / n[i];
            sum += a[i] * modulo_inverse(p, n[i]) * p;
        }

        return sum % prod;
    };

    return chinese_remainder(mods, remainders);
};
