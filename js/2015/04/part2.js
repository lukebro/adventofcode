const crypto = require('crypto');

module.exports = (input) => {
    let answer = 0;

    while (1) {
        let hash = crypto
            .createHash('md5')
            .update(input + answer)
            .digest('hex');

        if (hash.substring(0, 6) === '000000') {
            break;
        }

        answer++;
    }

    return answer;
};
