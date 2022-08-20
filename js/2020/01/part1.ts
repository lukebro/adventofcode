export default (input: string) => {
    const lines = input.split('\n').map(Number);

    let answer;

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[i] + lines[j] === 2020) {
                answer = lines[i] * lines[j];
                break;
            }
        }

        if (answer) {
            break;
        }
    }

    return answer;
};
