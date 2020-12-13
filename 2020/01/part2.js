module.exports = (input) => {
    input = input.split('\n').map(Number);
    let answer;

    // find sum of two numbers that add up
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            for (let k = j + 1; k < input.length; k++) {
                if (input[i] + input[j] + input[k] === 2020) {
                    answer = input[i] * input[j] * input[k];
                    break;
                }
            }
        }

        if (answer) {
            break;
        }
    }

    return answer;
}