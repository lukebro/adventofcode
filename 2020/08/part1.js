const { findall } = require('../../utils');

function runProgram(ins) {
    let hits = {};
    let acc = 0;

    let index = 0;

    while (ins[index]) {
        hits[index] = (hits[index] || 0) + 1;
        let prevIndex = index;
        let [op, arg] = ins[prevIndex];

        if (op === 'acc') {
            acc += arg;
            index += 1;
        } else if (op === 'nop') {
            index += 1;
        } else if (op === 'jmp') {
            index += arg;
        }

        if (hits[prevIndex] > 1) {
            break;
        }
    }

    return acc;
}

module.exports = (file) => {
    let lines = file.split('\n');

    let ins = lines.map((l) => {
        let [matches] = findall(/(nop|acc|jmp) (\+|\-)(\d+)/g, l);

        let [op, sign, arg] = matches;

        if (sign === '+') {
            arg = +arg;
        } else if (sign === '-') {
            arg = 0 - +arg;
        }

        return [op, arg];
    });

    return runProgram(ins);
};
