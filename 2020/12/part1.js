module.exports = (file) => {
    let lines = file.split('\n');

    lines = lines.map((line) => {
        let [, ins, unit] = line.match(/([A-Z])(\d+)/);

        return [ins, +unit];
    });

    let dir = 90;
    let x = 0;
    let y = 0;

    let move = (ins, unit) => {
        switch (ins) {
            case 'N':
                y += unit;
                break;
            case 'S':
                y -= unit;
                break;
            case 'E':
                x += unit;
                break;
            case 'W':
                x -= unit;
                break;
            case 'L':
                dir -= unit;
                dir = (dir + 360) % 360;
                break;
            case 'R':
                dir += unit;
                dir = (dir + 360) % 360;
                break;
            case 'F':
                if (dir === 0) {
                    y += unit;
                } else if (dir === 90) {
                    x += unit;
                } else if (dir === 180) {
                    y -= unit;
                } else if (dir === 270) {
                    x -= unit;
                }
                break;
        }
    };

    for (let line of lines) {
        move(...line);
    }

    return Math.abs(x) + Math.abs(y);
};
