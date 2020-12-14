// wrong answer: 154926388310329
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
        value = BigInt(value);
        mem = BigInt(mem);

        let addresses = new Set();
        let strValue = mem.toString(2).split('');
        let maskLength = fullmask.length;
        let floating = [];

        // we do the initial mask for 1s, keeping
        // track of where the floating bits are
        for (let i = strValue.length - 1; i >= 0; i--) {
            let m = fullmask[maskLength - (strValue.length - i)];

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

            for (let i = 0; i < float.length; i++) {
                let arr = float.slice();
                let static = arr.splice(i, 1);

                let one = replace(str, static, '0');
                let two = replace(str, static, '1');

                addresses.add(one).add(two);

                permute(arr, one);
                permute(arr, two);
            }
        };

        permute(floating, strValue.join(''));

        console.log(addresses);

        addresses = Array.from(addresses).map(x => BigInt(parseInt(x, 2)));

        console.log(addresses);

        for (let address of addresses) {
            if (registers[address]) {
                console.log("already set", address, registers[address]);
            }
            registers[address] = mask(value);
        }

        console.log('\n');
    }
    console.log(registers);
    return Object.values(registers).reduce((a, c) => a + c, 0n);
};
