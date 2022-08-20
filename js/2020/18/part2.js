const { assert } = require('@lib/utils');

// our operator precendance
const OP_P = {
    '+': 1,
    '*': 0,
};

module.exports = (file) => {
    let lines = file.split('\n').map((line) => {
        return line
            .replace(/ /g, '')
            .split('')
            .map((x) => {
                let n = Number(x);

                return isNaN(n) ? x : n;
            });
    });

    const apply = (a, b, op) => {
        if (op === '+') {
            return a + b;
        } else if (op === '*') {
            return a * b;
        }
    };

    /**
     * expression tree problem
     * infix can be solved with shunting yard algorithm
     * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
     */
    const solve = (tokens) => {
        let op = [];
        let value = [];

        let token;

        while ((token = tokens.shift())) {
            if (typeof token === 'number') {
                value.push(token);
                continue;
            }

            if (token === '(') {
                op.push(token);
                continue;
            }

            if (token === ')') {
                while (op[op.length - 1] !== '(') {
                    let x = op.pop();
                    let a = value.pop();
                    let b = value.pop();

                    value.push(apply(a, b, x));
                }

                op.pop();
                continue;
            }

            // we can define our operator precedence here
            while (
                op.length !== 0 &&
                op[op.length - 1] !== '(' &&
                OP_P[op[op.length - 1]] > OP_P[token]
            ) {
                let x = op.pop();
                let a = value.pop();
                let b = value.pop();

                value.push(apply(a, b, x));
            }

            op.push(token);
        }

        while (op.length !== 0) {
            let x = op.pop();
            let a = value.pop();
            let b = value.pop();

            value.push(apply(a, b, x));
        }

        assert(op.length === 0);
        assert(value.length === 1);

        return value[0];
    };

    let sum = 0;

    for (let tokens of lines) {
        sum += solve(tokens);
    }

    // this problem is def about binary expression trees

    return sum;
};
