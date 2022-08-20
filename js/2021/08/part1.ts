export default (file: string) => {
    const output = file.split('\n').map((line) => {
        const [, input] = line.split(' | ');

        return input.split(' ');
    });

    let count = 0;

    for (const group of output) {
        for (const value of group) {
            const len = value.length;

            switch (len) {
                case 2: // 1
                case 4: // 4
                case 3: // 7
                case 7: // 8
                    count += 1;
                    break;
            }
        }
    }

    return count;
};
