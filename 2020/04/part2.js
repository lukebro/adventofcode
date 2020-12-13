const { difference, findall } = require('../../utils');
const REQUIRED_VALUES = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

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

        if (diff.length !== 0) {
            continue;
        }

        let good = true;

        for (let key in passport) {
            let value = passport[key];

            switch (key) {
                case 'byr':
                    value = parseInt(value);
                    if (value < 1920 || value > 2002) {
                        good = false;
                    }
                    break;

                case 'iyr':
                    value = parseInt(value);
                    if (value < 2010 || value > 2020) {
                        good = false;
                    }
                    break;

                case 'eyr':
                    value = parseInt(value);
                    if (value < 2020 || value > 2030) {
                        good = false;
                    }
                    break;

                case 'hgt':
                    let match = value.match(/^(\d+)(cm|in)$/);

                    if (!match) {
                        good = false;
                        break;
                    }

                    let n = parseInt(match[1]);
                    let u = match[2];

                    if (u !== 'cm' && u !== 'in') {
                        good = false;
                        break;
                    }

                    if (u === 'cm' && (n < 150 || n > 193)) {
                        good = false;
                    } else if (u === 'in' && (n < 59 || n > 76)) {
                        good = false;
                    }

                    break;

                case 'hcl':
                    if (!value.match(/^#[0-9a-f]{6}$/)) {
                        good = false;
                    }

                    break;

                case 'ecl':
                    if (!value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) {
                        good = false;
                    }
                    break;

                case 'pid':
                    if (!value.match(/^[0-9]{9}$/)) {
                        good = false;
                    }
                    break;
            }

            if (!good) {
                break;
            }
        }

        if (!good) {
            continue;
        }

        valid++;
    }

    return valid;
};
