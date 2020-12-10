module.exports = (file) => {
    let lines = file.split('\n');

    lines = lines.map(Number);
    lines = lines.sort((a, b) => a - b);

    lines.push(lines[lines.length - 1] + 3);

    let perms = 0;

    let find = (arr, m) => {
        if (perms === Number.MAX_VALUE - 1000) {
            console.log("MAX HIT");
            process.exit();
        }
        if (arr.length === 1) {
            m = m.slice();
            m.push(arr[0]);

            perms++;
            return;
        }

        let d = 0;
        while (arr[d] - m[m.length - 1] <= 3) {
            let nextM = m.slice();
            nextM.push(arr[d]);

            find(arr.slice(d + 1), nextM);

            d++;
        }
    };

    find(lines, [0]);

    return perms;
};
