use std::collections::HashSet;

use aoc::*;

fn main() {
    let input = get_input_str();

    println!("Part 1: {}", part_one(input.clone()));
    println!("Part 2: {}", part_two(input));
}

fn solve(length: usize, data_stream: String) -> i32 {
    let stream = data_stream.chars().collect::<Vec<char>>();
    let mut uniq: HashSet<char> = HashSet::new();

    for (i, c) in stream.windows(length).enumerate() {
        uniq.clear();
        let found = c.iter().all(|x| uniq.insert(*x));

        if found {
            // window length plus the iteration we're on
            return (i + length) as i32;
        }
    }

    return -1;
}

fn part_one(input: String) -> i32 {
    solve(4, input)
}

fn part_two(input: String) -> i32 {
    solve(14, input)
}
