import { findall } from '@lib/utils';

type Probe = { x: number; y: number; vx: number; vy: number };

export const step = (probe: Probe): void => {
    probe.x += probe.vx;
    probe.y += probe.vy;

    if (probe.vx > 0) {
        probe.vx -= 1;
    }

    probe.vy -= 1;
};

export const findMaxHeight = (
    vx: number,
    vy: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number,
): number | null => {
    let maxY = -Infinity;

    const probe: Probe = { x: 0, y: 0, vx, vy };

    while (probe.x <= x2 && probe.y >= y1) {
        step(probe);
        maxY = Math.max(probe.y, maxY);

        // we hit the target
        if (probe.x >= x1 && probe.x <= x2 && probe.y >= y1 && probe.y <= y2) {
            return maxY;
        }
    }

    // missed target
    return null;
};

export const solve = (file: string): number[] => {
    const input = findall(
        /target area: x=(\d+|-\d+)..(\d+|-\d+), y=(\d+|-\d+)..(\d+|-\d+)/g,
        file,
    );

    // i spent an hour debugging this because i thought
    // y1 was the top and y2 was the bottom :facepalm:
    const [x1, x2, y1, y2]: number[] = input.map(Number);

    const heights: number[] = [];

    //           x
    //         -   x
    //       -   -   x
    //     -       -   x
    //   -           -   x
    // -               -  x
    // # # # # # # # # #     x misses, 45 45 90 triangle
    const maxVy = Math.round(x2 / Math.sqrt(2));
    for (let vy = -maxVy; vy <= maxVy; vy++) {
        // we can hit it without vertical component bkz of gravity
        // if vy = 0, max vx to hit the right edge in one step would be:
        // (0 - y1) = -y1
        for (let vx = 1; vx <= x2; vx++) {
            const height = findMaxHeight(vx, vy, x1, x2, y1, y2);

            if (height !== null) {
                heights.push(height);
            }
        }
    }

    return heights;
};

export default (file: string) => {
    const heights = solve(file);

    return Math.max(...heights);
};
