function parse(lines) {
    const matcher = /(\d+)x(\d+)x(\d+)/;

    return lines.split('\n').map((line) => {
        let [, l, w, h] = line.match(matcher);

        return { l: parseInt(l), w: parseInt(w), h: parseInt(h) };
    });
}

// 2*l*w + 2*w*h + 2*h*l
function solve(input) {
    let sqft = 0;

    input.forEach((pkg) => {
        let lw = pkg.l * pkg.w;
        let wh = pkg.w * pkg.h;
        let hl = pkg.h * pkg.l;

        sqft += 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
    });

    return sqft;
}

module.exports = {
    solve,
    parse,
};
