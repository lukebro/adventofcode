const { difference, findall } = require('@lib/utils');
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

module.exports = (lines) => {
    const passports = lines.split('\n\n').map((l) => {
        let matches = findall(/(\w{3}):(\S+)/g, l);

        return matches.reduce((c, m) => {
            c[m[0]] = m[1];

            return c;
        }, {});
    });

    let valid = 0;

    for (let passport of passports) {
        let keys = Object.keys(passport);
        let diff = difference(REQUIRED_VALUES, keys);

        if (diff.length > 1) {
            continue;
        }

        if (diff.length === 1 && diff[0] !== 'cid') {
            continue;
        }

        valid++;
    }

    return valid;
};
