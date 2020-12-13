module.exports = (input) => {
    input = input.split('\n');
    let nice = 0;

    for (let str of input) {
        if (!str.match(/([a-z]{2}).*\1/)) {
            continue;
        }

        if (!str.match(/([a-z]).\1/)) {
            continue;
        }

        nice++;
    }

    return nice;
};
