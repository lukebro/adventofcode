use aoc::*;

fn main() {
    let input = get_input_vec();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

fn part_one(input: &Vec<String>) -> u32 {
    let input = input
        .iter()
        .map(|x| x.parse().unwrap())
        .collect::<Vec<u32>>();

    let mut increases = 0;
    for w in input.windows(2) {
        if w[1] > w[0] {
            increases += 1;
        }
    }

    increases
}

fn part_two(input: &Vec<String>) -> u32 {
    let input = input
        .iter()
        .map(|x| x.parse().unwrap())
        .collect::<Vec<u32>>();

    let mut increases = 0;
    for w in input.windows(4) {
        // let first = w[0] + w[1] + w[2];
        // let second = w[1] + w[2] + w[3];
        // both have w[1] and w[2]

        if w[3] > w[0] {
            increases += 1;
        }
    }

    increases
}
