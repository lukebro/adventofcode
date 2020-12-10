module.exports = (file) => {
    let lines = file.split('\n');

    lines = lines.map(Number);
    lines = lines.sort((a, b) => a - b);

    let diff = { 1: 0, 3: 0};

    diff[lines[0] - 0] += 1;

    for (let i = 0; i < lines.length; i += 1) {

        let lo = lines[i];
        let hi = lines[i + 1];

        let d = hi - lo;


        diff[d] += 1;
    }

    diff[3] += 1;

    return diff[1] * diff[3];
};
