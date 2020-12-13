module.exports = (lines) => {
    let input = [];

    lines.split('\n').forEach((line) => {
        input.push([...line]);
    });

    let maxY = input.length;
    let maxX = input[0].length;
    let count = 0;
    let x = 0;
    let y = 0;

    while (y < maxY) {
        y += 1;
        x += 3;

        if (y >= maxY) {
            break;
        }

        if (input[y][x % maxX] === '#') {
            count++;
        }
    }

    return count;
};
