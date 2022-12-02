use aoc::*;

type Input = Vec<(u8, u8)>;

fn main() {
    let input = get_input_str()
        .as_bytes()
        .chunks(4)
        .map(|input| {
            assert!(input.len() >= 3);

            let (left, right) = (input[0], input[2]);

            (left - b'A', right - b'X')
        })
        .collect::<Input>();

    println!("Part 1: {}", part_one(&input));
    println!("Part 2: {}", part_two(&input));
}

fn part_one(input: &Input) -> i32 {
    let mut score: i32 = 0;

    for game in input {
        let (hand_one, hand_two) = *game;

        score += hand_two as i32 + 1;

        if hand_one == hand_two {
            score += 3;
        } else if (hand_two + 1) % 3 != hand_one {
            score += 6;
        }
    }

    score
}

fn part_two(input: &Input) -> i32 {
    let mut score: i32 = 0;

    for game in input {
        let (hand_one, hand_two) = *game;
        let hand_one = hand_one as i32;

        match hand_two {
            0 => score += ((hand_one - 1 + 3) % 3) + 1,
            1 => score += hand_one + 1 + 3,
            2 => score += ((hand_one + 1 + 3) % 3) + 1 + 6,
            _ => (),
        }
    }

    score
}
