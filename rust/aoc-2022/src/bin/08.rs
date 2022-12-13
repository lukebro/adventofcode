use aoc::*;

fn main() {
    let input = get_input_vec();
    let input = parse(&input);

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

fn part_one(input: &Grid) -> u32 {
    let mut visible = 0;

    for y in 0..input.len() {
        for x in 0..input.len() {
            if is_visible(x, y, input) {
                visible += 1;
            }
        }
    }

    visible
}

fn part_two(input: &Grid) -> u8 {
    0
}

fn is_visible(x: usize, y: usize, grid: &Grid) -> bool {
    let value = grid.get(x, y).unwrap();

    for dy in y..grid.len() {
        println!("{},{} = {}", x, y, dy);
        let v = grid.get(x, dy).unwrap();

        println!("{} >= {}", v, value);

        if v >= value {
            return false;
        }
    }

    for dy in 0..y {
        let v = grid.get(x, dy).unwrap();

        if v >= value {
            return false;
        }
    }

    for dx in x..grid.len() {
        let v = grid.get(dx, y).unwrap();

        if v >= value {
            return false;
        }
    }

    for dx in 0..x {
        let v = grid.get(dx, y).unwrap();

        if v >= value {
            return false;
        }
    }

    true
}

type Grid = Vec<Vec<u32>>;

trait GetFromGrid {
    fn get(&self, x: usize, y: usize) -> Option<u32>;
}

impl GetFromGrid for Grid {
    fn get(&self, x: usize, y: usize) -> Option<u32> {
        if let Some(row) = self[..].get(y) {
            return row.iter().nth(x).copied();
        }

        None
    }
}

fn parse(input: &Vec<String>) -> Grid {
    input
        .iter()
        .map(|line| {
            line.chars()
                .map(|c| c.to_digit(10).unwrap())
                .collect::<Vec<u32>>()
        })
        .collect::<Grid>()
}
