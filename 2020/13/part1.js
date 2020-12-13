const { findall } = require('../../utils');

module.exports = (file) => {
    let lines = file.split('\n');

    let departTime = Number(lines[0]);
    let busIds = findall(/(\d+)/g, lines[1]).map(Number);

    let times = busIds.map(id => [id, id]);

    for (let time of times) {
        while (time[1] < departTime) {
            time[1] += time[0]
        }
    }

    times = times.sort((a, b) => a[1] - b[1]);

    let myBus = times[0];

    return (myBus[1] - departTime) * myBus[0];
};
