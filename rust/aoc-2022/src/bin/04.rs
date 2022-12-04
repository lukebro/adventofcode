use aoc::*;

fn main() {
    let input = get_input_vec()
        .iter()
        .map(|line| {
            let n = line
                .split("-")
                .map(|line| {
                    return line.split(",");
                })
                .flatten()
                .take(4)
                .map(|x| x.parse::<u32>().unwrap())
                .collect::<Vec<u32>>();

            return RangePair {
                a: (n[0], n[1]),
                b: (n[2], n[3]),
            };
        })
        .collect::<Vec<RangePair>>();

    println!("part 1: {}", part_one(&input));
    println!("part 2: {}", part_two(&input));
}

#[derive(Debug)]
struct RangePair {
    a: (u32, u32),
    b: (u32, u32),
}

impl RangePair {
    fn is_inside(&self) -> bool {
        let Self { a, b } = self;

        if a.0 >= b.0 && a.1 <= b.1 {
            return true;
        }

        if a.0 <= b.0 && a.1 >= b.1 {
            return true;
        }

        false
    }

    fn is_overlap(&self) -> bool {
        let Self { a, b } = self;

        has_overlap(a, b) || has_overlap(b, a)
    }
}

fn has_overlap(a: &(u32, u32), b: &(u32, u32)) -> bool {
    if b.0 >= a.0 && b.0 <= a.1 {
        return true;
    }

    if b.1 >= a.0 && b.1 <= a.1 {
        return true;
    }

    false
}

fn part_one(input: &Vec<RangePair>) -> u32 {
    input.iter().fold(0 as u32, |mut acc, r| {
        if r.is_inside() {
            acc += 1
        }

        acc
    })
}

fn part_two(input: &Vec<RangePair>) -> u32 {
    input.iter().fold(0 as u32, |mut acc, r| {
        if r.is_overlap() {
            acc += 1
        }

        acc
    })
}
