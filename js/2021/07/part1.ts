export default (file: string) => {
    const positions = file.split(',').map(Number);

    const getGasCost = (position) => {
        let gasCost = 0;

        for (let i = 0; i < positions.length; i++) {
            gasCost += Math.abs(positions[i] - position);
        }

        return gasCost;
    };

    let cheapest = Infinity;

    for (let i = 0; i < positions.length; i++) {
        cheapest = Math.min(cheapest, getGasCost(i));
    }

    return cheapest;
};
