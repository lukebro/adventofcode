use aoc::*;
use md5::{Digest, Md5};

fn main() {
    let input = get_input_str();

    println!("Part 1: {}", part1_solution(&input));
    println!("Part 2: {}", part2_solution(&input));
}

pub fn starts_with_zero(input: &str, zeros: usize) -> bool {
    // use as u8 byte array
    let input = input.as_bytes();

    if zeros > input.len() {
        return false;
    }

    for i in 0..zeros {
        if input[i] != b'0' {
            return false;
        }
    }

    true
}

pub fn hash(input: &str) -> String {
    format!("{:x}", Md5::digest(input.as_bytes()))
}

pub fn solve(input: &str, zeros: usize) -> u32 {
    let mut count: u32 = 0;

    loop {
        let value = input.to_string() + &count.to_string()[..];
        let result = hash(&value);

        if starts_with_zero(&result, zeros) {
            break;
        }

        count += 1;
    }

    count
}

pub fn part1_solution(input: &str) -> u32 {
    solve(input, 5)
}

pub fn part2_solution(input: &str) -> u32 {
    solve(input, 6)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn can_count_zeros() {
        assert_eq!(starts_with_zero(&"000002323232", 5), true);
        assert_eq!(starts_with_zero(&"00002323232", 5), false);
        assert_eq!(starts_with_zero(&"0002323232", 3), true);
        assert_eq!(starts_with_zero(&"1", 3), false);
    }

    #[test]
    #[ignore] // it's too expensive...
    fn it_can_solve_example() {
        assert_eq!(solve(&"abcdef", 5), 609043);
        assert_eq!(solve(&"pqrstuv", 5), 1048970);
    }
}
