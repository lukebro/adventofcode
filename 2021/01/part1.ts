export default (input: string) => {
    const lines = input.split('\n').map(Number);

    let increases = 0;

    for (let i = 1; i < lines.length; i++) {
        const a = lines[i - 1];
        const b = lines[i];

        if (b > a) {
            increases += 1;
        }
    }

    return increases;
};
