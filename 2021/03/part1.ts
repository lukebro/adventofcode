export default (file: string) => {
    const grid: number[][] = file
        .split('\n')
        .map((line) => line.split('').map((n) => parseInt(n, 2)));

    const byteSize: number = grid?.[0].length;

    const oneCount = Array(grid[0].length).fill(0);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < byteSize; j++) {
            if (grid[i][j]) {
                oneCount[j] += 1;
            }
        }
    }

    let byteString = '';

    for (const one of oneCount) {
        if (one > grid.length - one) {
            byteString += '1';
        } else {
            byteString += '0';
        }
    }

    const gammaRate = parseInt(byteString, 2);
    const mask = parseInt('1'.repeat(byteSize), 2);
    const epsilonRate = gammaRate ^ mask;

    return gammaRate * epsilonRate;
};
