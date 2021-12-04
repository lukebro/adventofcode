import { findall } from '@lib/utils';

export default (file: string) => {
    const commands = file
        .split('\n')
        .map((line) => findall(/(forward|down|up) (\d+)/g, line));

    let depth = 0;
    let horizontal = 0;

    for (const [direction, value] of commands) {
        let inc = Number(value);
        switch (direction) {
            case 'forward':
                horizontal += inc;
                break;
            case 'down':
                depth += inc;
                break;
            case 'up':
                depth -= inc;
                break;
        }
    }

    return depth * horizontal;
};
