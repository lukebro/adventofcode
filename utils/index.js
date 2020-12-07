exports.difference = (a, b) => {
    b = Array.from(b);

    return Array.from(a).filter((x) => !b.includes(x));
};

exports.findall = (regex, str) => {
    let hits = [];
    let match;

    // we need g flag for exec to continue
    // to loop.. so incase i forget
    regex = new RegExp(regex, 'g');

    while ((match = regex.exec(str)) !== null) {
        let results = match.length === 1 ? match : match.splice(1);

        // if we have only one capture group
        if (results.length === 1) {
            hits.push(results[0]);
        } else {
            hits.push(results);
        }
    }

    return hits;
};
