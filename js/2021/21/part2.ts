import { sum, permutator } from '@lib/utils';
export const input = 'example.txt';

const nextPosition = (current, roll) => {
    return ((current + roll - 1) % 10) + 1;
};

// there's gonna be duplicate sums but i think that's ok
const DIE_ROLLS: number[][] = permutator([1, 2, 3], {
    size: 3,
    repeat: true,
}).map(sum);

const memo = new Map();
const key = (p, s) => {
    return `${p.concat(s).join(',')}`;
};

const playGame = (positions, scores, turn) => {
    if (scores[0] >= 21) {
        return [1, 0];
    }

    if (scores[1] >= 21) {
        return [0, 1];
    }

    const idx = turn % 2;
    let p1Wins = 0,
        p2Wins = 0;

    for (const ROLL of DIE_ROLLS) {
        let p = [...positions];
        let s = [...scores];

        p[idx] = nextPosition(p[idx], ROLL);
        s[idx] += p[idx];

        const k = key(p, s);

        let wins;
        if (memo.has(k)) {
            wins = memo.get(k);
        }
        {
            wins = playGame(p, s, turn + 1);
            memo.set(k, wins);
        }

        p1Wins += wins[0];
        p2Wins += wins[1];
    }

    return [p1Wins, p2Wins];
};

export default (file: string) => {
    const starting = file
        .split('\n')
        .map((line) => parseInt(line.match(/(\d+)/g)[1], 10));

    const positions = [...starting];
    const scores = [0, 0];

    const wins = playGame(positions, scores, 0);

    return wins;
};
