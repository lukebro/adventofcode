// I brute forced this for part
export default (file: string) => {
    const fish = file.split(',').map((n) => parseInt(n, 10));

    function progress(fish, days) {
        for (let day = 1; day <= days; day++) {
            // we're adding to the array so we need to cap it
            // to what we start with for the day
            const fishLength = fish.length;

            for (let i = 0; i < fishLength; i++) {
                let current = fish[i];

                if (current === 0) {
                    fish[i] = 6;
                    fish.push(8);
                } else {
                    fish[i] = fish[i] - 1;
                }
            }
        }
    }

    progress(fish, 80);

    return fish.length;
};
