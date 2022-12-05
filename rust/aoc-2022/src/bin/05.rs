use aoc::*;

fn main() {
    let input = get_input_str();
    let (mut buckets, commands) = parse(input);

    let mut second_bucket = buckets.clone();

    println!("Part 1: {}", part_one(&commands, &mut buckets));
    println!("Part 2: {}", part_two(&commands, &mut second_bucket));
}

fn part_one(commands: &Commands, buckets: &mut Crates) -> String {
    // operate crane 9000!
    for command in commands {
        for _ in 0..command.count {
            let item = buckets[command.from].pop().unwrap();
            buckets[command.to].push(item);
        }
    }

    get_message(&buckets)
}

fn part_two(commands: &Commands, buckets: &mut Crates) -> String {
    let mut items: Vec<char> = vec![];
    // operate crane 9001!
    for command in commands {
        for _ in 0..command.count {
            let item = buckets[command.from].pop().unwrap();
            items.push(item);
        }

        for c in items.iter().rev() {
            buckets[command.to].push(*c);
        }

        items.clear();
    }

    get_message(&buckets)
}

struct Command {
    count: usize,
    from: usize,
    to: usize,
}

type Crates = Vec<Vec<char>>;
type Commands = Vec<Command>;

fn get_message(buckets: &Crates) -> String {
    let mut result = String::new();

    for bucket in buckets {
        let c = bucket.iter().last().unwrap();
        result.push(*c);
    }

    result
}

fn parse(input: String) -> (Crates, Commands) {
    let mut chunks = input.split("\n\n");
    let bucket_lines = chunks.next().unwrap();
    let command_lines = chunks.next().unwrap();

    let buckets: Crates = parse_buckets(bucket_lines);
    let commands: Commands = parse_commands(command_lines);

    (buckets, commands)
}

fn parse_buckets(input: &str) -> Crates {
    let mut iter = input.lines().rev();
    let num_buckets = iter
        .next()
        .unwrap()
        .split("   ")
        .last()
        .unwrap()
        .trim()
        .parse::<usize>()
        .unwrap();

    let mut buckets: Crates = vec![vec![]; num_buckets];

    for line in iter {
        let line = line.as_bytes();
        for x in (1..line.len()).step_by(4) {
            let c = line[x] as char;

            if c.is_whitespace() {
                continue;
            }

            buckets.get_mut((x - 1) / 4).unwrap().push(c);
        }
    }

    buckets
}

fn parse_commands(input: &str) -> Commands {
    let mut commands: Commands = vec![];

    for line in input.lines() {
        let mut parts = line.split(' ');

        let count = parts.nth(1).unwrap().parse::<usize>().unwrap();
        let from = parts.nth(1).unwrap().parse::<usize>().unwrap() - 1;
        let to = parts.nth(1).unwrap().parse::<usize>().unwrap() - 1;

        commands.push(Command { count, from, to });
    }

    commands
}
