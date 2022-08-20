import { isSetEqual } from '@lib/utils';

export default (file: string) => {
    const input = file.split('\n').map((line) => {
        const [digits, input] = line.split(' | ');

        return [digits.split(' '), input.split(' ')];
    });

    const intersect = (a: string, b: string): number => {
        const aa = a.split('');
        const ba = b.split('');

        return aa.filter((v) => ba.includes(v)).length;
    };

    const solve = (signals) => {
        const dict = {};

        for (let sig of signals) {
            switch (sig.length) {
                case 2:
                    dict[1] = sig;
                    break;
                case 4:
                    dict[4] = sig;
                    break;
                case 3:
                    dict[7] = sig;
                    break;
                case 7:
                    dict[8] = sig;
                    break;
                case 5:
            }
        }

        // solve for 2
        for (let sig of signals) {
            if (sig.length === 5) {
                if (intersect(sig, dict[4]) === 2) {
                    dict[2] = sig;
                    break;
                }
            }
        }

        // solve for remainder of 5 lengths, 2 and 5
        for (let sig of signals) {
            if (dict[3] && dict[5]) break;

            if (sig.length === 5) {
                if (intersect(sig, dict[1]) === 2) {
                    dict[3] = sig;
                } else if (dict[2] !== sig) {
                    // dict[5] has inctersection of 1 like dict[2]
                    // but dict[2] is already set so just gotta check
                    // if it already exists
                    dict[5] = sig;
                }
            }
        }

        for (let sig of signals) {
            if (dict[9] && dict[6] && dict[0]) break;

            if (sig.length === 6) {
                if (intersect(sig, dict[4]) === 4) {
                    dict[9] = sig;
                } else if (intersect(sig, dict[1]) === 1) {
                    dict[6] = sig;
                } else if (intersect(sig, dict[5]) === 4) {
                    dict[0] = sig;
                }
            }
        }

        for (const key in dict) {
            dict[key] = new Set(dict[key]);
        }

        return dict;
    };

    let count = 0;

    for (const line of input) {
        const [signals, output] = line;
        const dict = solve(signals);
        let n = '';

        for (const i of output) {
            // the key isn't ordered? ugh
            const set = new Set(i);

            for (const key in dict) {
                if (isSetEqual(dict[key], set)) {
                    n += key as string;
                }
            }
        }

        count += Number(n);
    }

    return count;
};
