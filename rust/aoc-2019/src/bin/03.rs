#![allow(dead_code, unused_variables)]

use std::collections::HashSet;

use aoc::*;

fn main() {
    let input = get_input_vec();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

#[derive(Debug, Clone, Copy, Eq)]
struct PathCell {
    x: i32,
    y: i32,
    d: i32,
}

impl PartialEq for PathCell {
    fn eq(&self, other: &Self) -> bool {
        self.x.eq(&other.x) && self.y.eq(&other.y)
    }
}

impl std::hash::Hash for PathCell {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        state.write_i32(self.x);
        state.write_i32(self.y);
    }
}

fn parse_path(paths: &str) -> HashSet<PathCell> {
    let mut set: HashSet<PathCell> = HashSet::new();
    let mut prev = PathCell { x: 0, y: 0, d: 0 };

    for i in paths.split(",") {
        let n = i[1..].parse::<u32>().unwrap();

        match i.chars().nth(0).unwrap() {
            'U' => {
                prev = interpolate_y(&mut set, &prev, n as i32);
            }
            'D' => {
                prev = interpolate_y(&mut set, &prev, 0 - n as i32);
            }
            'L' => {
                prev = interpolate_x(&mut set, &prev, 0 - n as i32);
            }
            'R' => {
                prev = interpolate_x(&mut set, &prev, n as i32);
            }
            _ => panic!("Bad line definition"),
        }
    }

    set
}

fn interpolate_x(set: &mut HashSet<PathCell>, prev: &PathCell, dx: i32) -> PathCell {
    let mut prev = prev.clone();
    let diff = if dx < 0 { -1 } else { 1 };

    for i in 1..=dx.abs() {
        prev = PathCell {
            x: prev.x + diff,
            y: prev.y,
            d: prev.d + 1,
        };
        set.insert(prev);
    }

    prev
}

fn interpolate_y(set: &mut HashSet<PathCell>, prev: &PathCell, dy: i32) -> PathCell {
    let mut prev = prev.clone();
    let diff = if dy < 0 { -1 } else { 1 };

    for i in 1..=dy.abs() {
        prev = PathCell {
            x: prev.x,
            y: prev.y + diff,
            d: prev.d + 1,
        };
        set.insert(prev);
    }

    prev
}

fn manhatten_distance(input: &PathCell) -> u32 {
    ((0 - input.x).abs() + (0 - input.y).abs()) as u32
}

fn parse(input: &Vec<String>) -> (HashSet<PathCell>, HashSet<PathCell>) {
    let mut input = input.iter();

    let (one, two) = (input.next().unwrap(), input.next().unwrap());

    let map_one = parse_path(one);
    let map_two = parse_path(two);

    (map_one, map_two)
}

fn part_one(input: &Vec<String>) -> u32 {
    let (map_one, map_two) = parse(input);

    let mut min: Option<(&PathCell, u32)> = None;

    for x in map_one.intersection(&map_two) {
        if let Some(current) = min {
            let test = manhatten_distance(&x);

            if test < current.1 {
                min = Some((x, test));
            }
        } else {
            min = Some((x, manhatten_distance(&x)));
        }
    }

    min.unwrap().1
}

fn part_two(input: &Vec<String>) -> u32 {
    let (map_one, map_two) = parse(input);
    let inter = map_one.intersection(&map_two).collect::<Vec<&PathCell>>();
    let mut min: u32 = std::u32::MAX;

    for i in inter {
        let a = map_one.get(&i).unwrap();
        let b = map_two.get(&i).unwrap();

        let total = (a.d + b.d) as u32;

        if total < min {
            min = total;
        }
    }

    min
}
