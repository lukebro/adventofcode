use aoc::*;

fn main() {
    let input = get_input_vec();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

fn compare_two(a: &str, b: &str) -> Option<u8> {
    assert_eq!(a.len(), b.len());

    for c in a.as_bytes() {
        if b.contains(*c as char) {
            return Some(rank(*c));
        }
    }

    None
}

fn compare_all(input: &[String]) -> Option<u8> {
    assert!(input.len() >= 2);

    let first = &input[0];

    for matcher in first.chars() {
        let mut missing = false;

        for other in &input[1..] {
            if !other.contains(matcher) {
                missing = true;
                break;
            }
        }

        if !missing {
            return Some(rank(matcher as u8));
        }
    }

    None
}

fn rank(input: u8) -> u8 {
    if input >= b'a' {
        input - b'a' + 1
    } else {
        input - b'A' + 27
    }
}

fn part_one(input: &Vec<String>) -> u32 {
    let mut score: u32 = 0;

    for line in input {
        if let Some(i) = compare_two(&line[0..line.len() / 2], &line[line.len() / 2..]) {
            score += i as u32;
        }
    }

    score
}

fn part_two(input: &Vec<String>) -> u32 {
    let mut score: u32 = 0;

    for lines in input.chunks(3) {
        if let Some(i) = compare_all(lines) {
            score += i as u32;
        }
    }

    score
}
