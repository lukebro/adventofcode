const { pad } = require('../../utils');

module.exports = (file) => {
    let lines = file.split('\n');
    let fullmask;
    let andMask;
    let orMask;
    let registers = {};

    const mask = (value) => {
        return (value | orMask) & andMask;
    };

    // strings are immutable in js :(
    const replace = (str, index, value) => {
        str = str.split('');
        str[index] = value;

        return str.join('');
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith('mask')) {
            [, fullmask] = line.match(/mask = ([X10]+)/);
            orMask = BigInt(parseInt(fullmask.replace(/X/g, '0'), 2));
            andMask = BigInt(parseInt(fullmask.replace(/X/g, '1'), 2));

            continue;
        }

        let [, mem, value] = line.match(/mem\[(\d+)\] = (\d+)/);
        value = Number(value);
        mem = BigInt(mem);

        let addresses = new Set();
        let maskLength = fullmask.length;
        let strValue = pad(mem.toString(2), maskLength, '0').split('');
        let floating = [];

        // we do the initial mask for 1s, keeping
        // track of where the floating bits are
        for (let i = maskLength - 1; i >= 0; i--) {
            let m = fullmask[i];

            if (m === '0') {
                continue;
            } else if (m === '1') {
                strValue[i] = '1';
            } else if (m === 'X') {
                floating.push(i);
            }
        }

        const permute = (float, str) => {
            if (float.length === 0) return;

            let arr = float.slice();
            let static = arr.shift();

            let one = replace(str, static, '0');
            let two = replace(str, static, '1');

            addresses.add(one).add(two);

            permute(arr, one);
            permute(arr, two);
        };

        permute(floating, strValue.join(''));

        addresses = Array.from(addresses).map((x) => parseInt(x, 2));

        for (let address of addresses) {
            registers[address] = value;
        }
    }
    return Object.values(registers).reduce((a, c) => a + c, 0);
};
