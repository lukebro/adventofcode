export default (file: string) => {
    const positions = file.split(',').map(Number);

    const getGasCost = (position) => {
        let gasCost = 0;

        for (let i = 0; i < positions.length; i++) {
            const distance = Math.abs(positions[i] - position);

            // googled factorial but with addition and found this
            // https://math.stackexchange.com/questions/593318/factorial-but-with-addition/593323
            // could of just done a simple while (n > 0 } { sum += n; n -= 1; } but this is cooler
            gasCost += (Math.pow(distance, 2) + distance) / 2;
        }

        return gasCost;
    };

    let cheapest = Infinity;

    for (let i = 0; i < positions.length; i++) {
        cheapest = Math.min(cheapest, getGasCost(i));
    }

    return cheapest;
};
