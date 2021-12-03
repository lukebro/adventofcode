export default (file: string) => {
    const grid = file.split('\n').map((line) => line.split('').map(Number));

    const oneCount = Array(grid[0].length).fill(0);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
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
    const mask = parseInt(Array(grid[0].length).fill(1).join(''), 2);
    const epsilonRate = gammaRate ^ mask;

    return gammaRate * epsilonRate;
};
