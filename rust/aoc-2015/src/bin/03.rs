use aoc::*;
use std::collections::HashSet;

fn main() {
    let input = get_input_str();
    let bytes = input.as_bytes();

    println!("Part 1: {}", part1_solution(&bytes));
    println!("Part 2: {}", part2_solution(&bytes));
}

pub fn part1_solution(input: &[u8]) -> u32 {
    let mut x: i32 = 0;
    let mut y: i32 = 0;
    let mut houses: HashSet<String> = HashSet::new();

    houses.insert(format!("{},{}", x, y));

    for c in input.iter() {
        match *c {
            b'>' => x += 1,
            b'<' => x -= 1,
            b'^' => y -= 1,
            b'v' => y += 1,
            _ => (),
        }

        let key = format!("{},{}", x, y);

        houses.insert(key);
    }

    houses.len() as u32
}

pub fn part2_solution(input: &[u8]) -> u32 {
    let mut santa = (0, 0);
    let mut robo_santa = (0, 0);
    let mut houses: HashSet<String> = HashSet::new();
    let mut turn = true;

    houses.insert(format!("{},{}", 0, 0));

    for c in input.iter() {
        let mut d = match turn {
            true => &mut santa,
            false => &mut robo_santa,
        };

        turn = !turn;

        match *c {
            b'>' => d.0 += 1,
            b'<' => d.0 -= 1,
            b'^' => d.1 -= 1,
            b'v' => d.1 += 1,
            _ => (),
        }

        let key = format!("{},{}", d.0, d.1);

        houses.insert(key);
    }

    houses.len() as u32
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn deliver_to_houses() {
        assert_eq!(part1_solution(">".as_bytes()), 2);
        assert_eq!(part1_solution("^>v<".as_bytes()), 4);
        assert_eq!(part1_solution("^v^v^v^v^v^v^v^v^v^v^v".as_bytes()), 2);
    }
}
