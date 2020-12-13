const { findall } = require('../../utils');

function runProgram(ins) {
    let hits = {};
    let acc = 0;

    let index = 0;

    let infinite = false;

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
            infinite = true;
            break;
        }
    }

    if (infinite) {
        return null;
    }

    return acc;
}

module.exports = (file) => {
    let lines = file.split('\n');

    let ins = lines.map((l) => {
        let matches = findall(/(nop|acc|jmp) (\+|\-)(\d+)/g, l);

        let [op, sign, arg] = matches;

        if (sign === '+') {
            arg = +arg;
        } else if (sign === '-') {
            arg = 0 - +arg;
        }

        return [op, arg];
    });

    let result;

    // brute force it!
    for (let i = 0; i < ins.length; i++) {
        let [op] = ins[i];

        if (op === 'acc') {
            continue;
        }

        // deep clone
        let newIns = ins.map((x) => [...x]);

        if (op === 'jmp') {
            newIns[i][0] = 'nop';
        } else if (op === 'nop') {
            newIns[i][0] = 'jmp';
        }

        result = runProgram(newIns);

        if (result !== null) {
            break;
        }
    }

    return result;
};
