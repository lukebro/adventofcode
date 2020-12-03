function solve(input) {
    let answer;

    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] + input[j] === 2020) {
                answer = input[i] * input[j];
                break;
            }
        }

        if (answer) {
            break;
        }
    }

    return answer;
}

module.exports = {
    solve,
    input: (s) => s.map(Number),
};
