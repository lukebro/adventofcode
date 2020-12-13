exports.difference = (a, b) => {
    b = Array.from(b);

    return Array.from(a).filter((x) => !b.includes(x));
};

exports.findall = (regex, str) => {
    let hits = [];
    let match;

    // we need g flag for exec to continue
    // to loop.. so incase i forget
    regex = new RegExp(regex, 'g');

    while ((match = regex.exec(str)) !== null) {
        let results = match.length === 1 ? match : match.splice(1);
        // if we have only one capture group
        if (results.length === 1) {
            hits.push(results[0]);
        } else {
            hits.push(results);
        }
    }

    if (hits.length === 1) {
        return hits[0];
    }

    return hits;
};

exports.pad = (str, length, char = '0') => {
    while (str.length < length) {
        str = char + str;
    }

    return str;
};

const mod_inverse = (a, b) => {
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
exports.mod_inverse = mod_inverse;

// http://rosettacode.org/wiki/Chinese_remainder_theorem
// where n = list of mods and a is list of remainders
exports.crt = (n, a) => {
    let prod = n.reduce((a, c) => a * c, 1n);
    let sum = 0n;

    for (let i = 0; i < n.length; i++) {
        let p = prod / n[i];
        sum += a[i] * mod_inverse(p, n[i]) * p;
    }

    return sum % prod;
};
