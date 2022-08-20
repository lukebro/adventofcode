const distance = (point1, point2) => {
    let sum = 0;

    for (let i = 0; i < 3; i++) {
        sum += Math.abs(point1[i] - point2[i]);
    }

    return sum;
};

const getDistances = (scanner) => {
    const grid = new Map();

    for (let i = 0; i < scanner.length; i++) {
        let distances = [];
        for (let j = 0; j < scanner.length; j++) {
            if (i === j) continue;

            distances.push(distance(scanner[i], scanner[j]));
        }

        grid.set(scanner[i].join(','), distances);
    }

    return grid;
};

export default (file: string) => {
    const scanners = file.split('\n\n').map((rest) => {
        const [, ...lines] = rest.split('\n');

        return lines.map((line) => line.split(',').map(Number));
    });

    const distances = [];

    for (const scanner of scanners) {
        distances.push(getDistances(scanner));
    }

    let [one, ...rest] = distances;
    let count = 0;
    for (const distance of rest) {
        for (const [k, v] of distance) {
            for (const v1 of v) {
                let b = false;
                for (const [, v2] of one) {
                    if (v2.indexOf(v1) > -1) {
                        b = true;
                        count += 1;
                        break;
                    }
                }

                if (b) break;
            }
        }
    }

    return count;
};

export const input = 'example.txt';
