use aoc::*;

fn main() {
    let input = get_input_str();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input).unwrap());
}

pub fn part_one(input: &str) -> i32 {
    let mut floor = 0;

    for c in input.chars() {
        floor += match c {
            ')' => -1,
            '(' => 1,
            _ => 0,
        }
    }

    floor
}

pub fn part_two(input: &str) -> Option<u32> {
    let mut floor = 0;
    for (i, c) in input.chars().enumerate() {
        floor += match c {
            ')' => -1,
            '(' => 1,
            _ => 0,
        };

        if floor == -1 {
            return Some((i + 1) as u32);
        }
    }

    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_example() {
        assert_eq!(part_one(&"()()"), 0);
    }

    #[test]
    fn second_example() {
        assert_eq!(part_one(&")())())"), -3);
    }

    #[test]
    fn it_will_find_foor() {
        assert_eq!(part_two(&"(()))").unwrap(), 5);
    }
}
