const { crt } = require('../../utils');

module.exports = (file) => {
    let lines = file.split('\n');
    let busIds = lines[1].split(',').map((x) => (x === 'x' ? x : BigInt(x)));

    // solve system of linear congruences using crt

    // AHHHH this problem hits JS's Number.MAX_SAFE_INTEGER
    // so after pulling my hair out for an hour I realized I have to convert everything to BigInt

    let remainders = [];
    let mods = [];
    for (let i = 0; i < busIds.length; i++) {
        let id = busIds[i];

        if (id === 'x') {
            continue;
        }

        // console.log(`x = ${id - i} (mod ${id})`);

        remainders.push(id - BigInt(i));
        mods.push(id);
    }

    // edit after contest, moved crt + mod_inverse into utils
    // for future puzzles

    return crt(mods, remainders);
};
