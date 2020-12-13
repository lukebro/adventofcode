module.exports = (input) => {
    input = input.split('\n\n').map((i) => i.split('\n'));
    let total = 0;

    for (let group of input) {
        let all = [];

        for (let answers of group) all.push(...answers);

        total += new Set(all).size;
    }

    return total;
};
