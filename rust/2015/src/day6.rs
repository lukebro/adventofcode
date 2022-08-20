use regex::Regex;

#[derive(Debug, PartialEq)]
pub enum Action {
    ON,
    OFF,
    TOGGLE,
}

#[derive(Debug)]
pub struct Command {
    command: Action,
    start: (usize, usize),
    end: (usize, usize),
}

#[aoc_generator(day6)]
pub fn generator(input: &str) -> Vec<Command> {
    let matcher = Regex::new(r"(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)").unwrap();

    input
        .lines()
        .map(|line| {
            let cap = matcher.captures(line).unwrap();

            let cmd = &cap[1];
            let start: (usize, usize) = (cap[2].parse().unwrap(), cap[3].parse().unwrap());
            let end: (usize, usize) = (cap[4].parse().unwrap(), cap[5].parse().unwrap());

            let action = match cmd {
                "turn on" => Action::ON,
                "turn off" => Action::OFF,
                "toggle" => Action::TOGGLE,
                _ => panic!(),
            };

            Command {
                command: action,
                start,
                end,
            }
        })
        .collect()
}

#[test]
fn it_works() {
    let r = generator(&"turn on 10,30 through 50,100\nturn off 14,31 through 10,50");

    println!("{:?}", r);
}

#[aoc(day6, part1)]
pub fn part1_solution(input: &Vec<Command>) -> u32 {
    let mut grid = [[false; 1000]; 1000];

    for cmd in input.iter() {
        let (x1, y1) = cmd.start;
        let (x2, y2) = cmd.end;

        for i in y1..y2 + 1 {
            for j in x1..x2 + 1 {
                match cmd.command {
                    Action::ON => grid[i][j] = true,
                    Action::OFF => grid[i][j] = false,
                    Action::TOGGLE => grid[i][j] = !grid[i][j],
                }
            }
        }
    }

    let mut count: u32 = 0;

    for y in 0..1000 {
        for x in 0..1000 {
            if grid[y][x] {
                count += 1;
            }
        }
    }

    count
}

#[aoc(day6, part2)]
pub fn part2_solution(input: &Vec<Command>) -> u32 {
    let mut grid: [[u32; 1000]; 1000] = [[0; 1000]; 1000];

    for cmd in input.iter() {
        let (x1, y1) = cmd.start;
        let (x2, y2) = cmd.end;

        for i in y1..y2 + 1 {
            for j in x1..x2 + 1 {
                match cmd.command {
                    Action::ON => grid[i][j] += 1,
                    Action::OFF => {
                        if grid[i][j] == 0 {
                            continue;
                        }

                        grid[i][j] = grid[i][j] - 1;
                    }
                    Action::TOGGLE => grid[i][j] += 2,
                }
            }
        }
    }

    let mut count: u32 = 0;

    for y in 0..1000 {
        for x in 0..1000 {
            count += grid[y][x];
        }
    }

    count
}
