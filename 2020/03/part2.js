const walk = (map) => (xr, yr) => {
    let maxY = map.length;
    let maxX = map[0].length;
    let count = 0;
    let x = 0;
    let y = 0;

    while (y < maxY) {
        y += yr;
        x += xr;

        if (y >= maxY) {
            break;
        }

        if (map[y][x % maxX] === '#') {
            count++;
        }
    }

    return count;
};

module.exports = (lines) => {
    let input = [];

    lines.split('\n').forEach((line) => {
        input.push([...line]);
    });

    let s = walk(input);

    return s(1, 1) * s(3, 1) * s(5, 1) * s(7, 1) * s(1, 2);
};