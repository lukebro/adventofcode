import { parse, reduce, createNode, magnitude } from './part1';

export default (file: string) => {
    const lines = file.split('\n');
    let maxMagnitude = 0;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (i === j) continue;

            // since we mutate the trees once we dirty it
            // it's no good.. so i recreate the tree for the line every
            // run.. :')

            let node = createNode(null, parse(lines[i])[0], parse(lines[j])[0]);
            reduce(node);
            maxMagnitude = Math.max(maxMagnitude, magnitude(node));

            node = createNode(null, parse(lines[j])[0], parse(lines[i])[0]);
            reduce(node);
            maxMagnitude = Math.max(maxMagnitude, magnitude(node));
        }
    }

    return maxMagnitude;
};
