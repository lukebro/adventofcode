function isNum(s) {
    return /[0-9+]/.test(s);
}

// i had help solving this one..
// i parsed and wrote the regex out but after getting stuck
// and seeing the answer... i couldn't unsee it :(

function parse(input) {
    input = input.split('\n');

    return input.reduce((wires, i) => {
        let [, a, b, c, d] = i.match(
            /([a-z0-9]*?)\s?([NOT|AND|OR|LSHIFT|RSHIFT]*)\s?([a-z0-9]+) -> ([a-z0-9]+)$/
        );

        let out = d || null;
        let op = b || null;
        let right = c || null;
        let left = null;

        if (op) {
            left = a || null;
        }

        // convert to num
        if (isNum(left)) left = +left;
        if (isNum(right)) right = +right;

        wires[out] = [op, left, right];

        return wires;
    }, {});
}

function solveWire(solved, op, left, right) {
    if (typeof left == 'string')
        if (left in solved) left = solved[left];
        else return null;

    if (typeof right == 'string')
        if (right in solved) right = solved[right];
        else return null;

    if (op == 'NOT') {
        return 65535 - right;
    }

    if (op == 'AND') {
        return left & right;
    }

    if (op == 'OR') {
        return left | right;
    }

    if (op == 'LSHIFT') {
        return left << right;
    }

    if (op == 'RSHIFT') {
        return left >> right;
    }

    return right;
}

function solveWires(wires, initial = {}) {
    let total = Object.keys(wires).length;
    let solved = initial;

    while (Object.keys(solved).length < total) {
        for (let wire in wires) {
            if (wire in solved) continue;

            let solution = solveWire(solved, ...wires[wire]);

            if (solution !== null) {
                solved[wire] = solution;
            }
        }
    }

    return solved;
}

function solve(wires) {
    let solved = {};
    let solvedWires = solveWires(wires, solved);

    solved = { b: solved.a };

    solvedWires = solveWires(wires, solved);

    return solvedWires.a;
}

module.exports = {
    solve,
    parse,
};
