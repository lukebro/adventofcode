use aoc::*;

fn main() {
    let input = get_input_str()
        .split("\n\n")
        .map(|elf| {
            elf.split('\n')
                .map(|x| x.parse::<u32>().unwrap())
                .sum::<u32>()
        })
        .collect::<Vec<u32>>();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

fn part_one(input: &Vec<u32>) -> u32 {
    input.into_iter().max().unwrap().to_owned()
}

fn part_two(input: &Vec<u32>) -> u32 {
    let mut sorted: Vec<u32> = input.clone();

    sorted.sort_by(|a, b| b.cmp(a));

    sorted
        .into_iter()
        .take(3)
        .collect::<Vec<u32>>()
        .into_iter()
        .sum::<u32>()
}
