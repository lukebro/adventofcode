const _ = require('lodash');

function parse(lines) {
    return lines.split('\n\n').map((l) => {
        let matches = [...l.matchAll(/(\w{3}):(\S+)/g)];

        return matches.reduce((c, m) => {
            c[m[1]] = m[2];

            return c;
        }, {});
    });
}

const REQUIRED_VALUES = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid',
];

function solve(passports) {
    let valid = 0;

    for (let passport of passports) {
        let keys = Object.keys(passport);
        let diff = _.difference(REQUIRED_VALUES, keys);

        if (diff.length > 1) {
            continue;
        }

        if (diff.length === 1 && diff[0] !== 'cid') {
            continue;
        }

        valid++;
    }

    return valid;
}

module.exports = {
    solve,
    parse,
};
