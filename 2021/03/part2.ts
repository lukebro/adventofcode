// I tried really hard to find a bit operation to make this work.
// I couldn't think of one other than having a mask such as 10000 to XOR
// and check if a line is valid or not.. This seemed more complicated + more
// code than just working with string representations.. So I did that. Oh well.
export default (file: string) => {
    const lines = file.split('\n');

    function getRating(numbers, flip: boolean = false) {
        let arr = numbers.slice();
        let idx = 0;

        while (arr.length > 1 && idx < numbers[0].length) {
            let oneCount = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][idx] === '1') {
                    oneCount += 1;
                }
            }

            let mask = oneCount >= arr.length - oneCount ? '1' : '0';

            if (flip) {
                mask = mask === '1' ? '0' : '1';
            }

            const next = [];

            for (const bits of arr) {
                const bit = bits.charAt(idx);
                // don't want to break array during loop/in place
                if (bit === mask) next.push(bits);
            }

            arr = next;
            idx += 1;
        }

        return arr[0] || null;
    }

    const oxygenRating = getRating(lines);
    const co2Rating = getRating(lines, true);

    return parseInt(oxygenRating, 2) * parseInt(co2Rating, 2);
};
