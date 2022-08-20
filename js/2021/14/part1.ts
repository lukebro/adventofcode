import { findall } from '@lib/utils';

export default (file: string) => {
    const [part1, part2] = file.split('\n\n');

    let polymer: string[] = part1.split('');

    const pairInsertion: Map<string, string> = part2
        .split('\n')
        .reduce((map, line) => {
            const [left, right]: string[] = findall(/([A-Z]+) -> ([A-Z])/g, line);

            map.set(left, right);

            return map;
        }, new Map() as Map<string, string>);

    const step = (polymer: string[]) => {
        for (let i = 0; i < polymer.length - 1; i++) {
            const pair = polymer[i] + polymer[i + 1];

            if (pairInsertion.has(pair)) {
                const insert = pairInsertion.get(pair);

                polymer.splice(i + 1, 0, insert);
                i += 1;
            }
        }
    };

    for (let i = 0; i < 10; i++) {
        step(polymer);
    }

    const count = new Map<string, number>();

    for (let n of polymer) {
        if (count.has(n)) {
            count.set(n, count.get(n) + 1);
        } else {
            count.set(n, 1);
        }
    }

    const max = Math.max(...count.values());
    const min = Math.min(...count.values());

    return max - min;
};
