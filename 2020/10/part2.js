module.exports = (file) => {
    let lines = file.split('\n');

    lines = lines.map(Number);
    lines = lines.sort((a, b) => a - b);

    lines.push(lines[lines.length - 1] + 3);

    let memo = {};

    // m is the last number we're comparing
    // arr is the subset of unchosen permutation paths
    let find = (arr, m) => {
        if (arr.length === 1) {
            return 1;
        }


        if (memo[arr.length + ':' + m]) {
            return memo[arr.length + ':' + m];
        }

        let d = 0;
        let sum = 0;

        while (arr[d] - m <= 3) {
            sum += find(arr.slice(d + 1), arr[d]);
            d++;
        }

        memo[arr.length + ':' + m] = sum;

        return sum;
    };

    return find(lines, 0);
};
