/**
 *
 * UGH ~ wasted a lot of time because of this, was getting negative numbers
 * and my fears were comfired:
 * https://stackoverflow.com/questions/36986784/why-does-javascript-treat-a-number-as-a-twos-complement
 * this is extremely funky for JS to do :(
 * https://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
 * I couldn't get the >>> 0 trick to work either, BigInt works, probably because BigInt is 64-bits
 * and we only use 36 bits
 */
module.exports = (file) => {
    let lines = file.split('\n');
    let mask;
    let andMask;
    let orMask;
    let registers = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith('mask')) {
            [, mask] = line.match(/mask = ([X10]+)/);
            orMask = BigInt(parseInt(mask.replace(/X/g, '0'), 2));
            andMask = BigInt(parseInt(mask.replace(/X/g, '1'), 2));

            continue;
        }

        let [, mem, value] = line.match(/mem\[(\d+)\] = (\d+)/);
        value = BigInt(value);

        registers[mem] = (value | orMask) & andMask;
    }

    return registers.reduce((a, c) => a + c, 0n);
};
