export default (file: string) => {
    const lines = file.split('\n');

    const KEY = {
        '(': ')',
        '{': '}',
        '<': '>',
        '[': ']',
    };

    const SCORE = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };

    const syntaxCheck = (line) => {
        const stack = [];
        const state = { c: false, i: false, error: null, stack };

        for (let i = 0; i < line.length; i++) {
            const input = line.charAt(i);

            if (KEY[input]) {
                stack.push(input);
            } else {
                const item = stack.pop();

                if (KEY[item] !== input) {
                    state.c = true;
                    state.error = { expected: KEY[item], found: input };

                    return state;
                }
            }
        }

        if (stack.length !== 0) {
            state.i = true;
        }

        return state;
    };

    let score = 0;

    for (let line of lines) {
        const state = syntaxCheck(line);

        if (state.i) continue;

        if (!state.c) continue;

        score += SCORE[state.error.found];
    }

    return score;
};
