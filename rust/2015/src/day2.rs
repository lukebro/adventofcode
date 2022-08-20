#[derive(Debug, PartialEq, Eq)]
pub struct Present(u32, u32, u32);

#[aoc_generator(day2)]
pub fn generate(input: &str) -> Vec<[u32; 3]> {
    input
        .lines()
        .filter_map(|s| {
            let v: Vec<u32> = s.split('x').flat_map(|n| n.parse::<u32>()).collect();

            match &v[..] {
                &[x, y, z] => Some([x, y, z]),
                _ => None,
            }
        })
        .collect()
}

#[aoc(day2, part1)]
pub fn part1_solution(input: &Vec<[u32; 3]>) -> u32 {
    input.iter().fold(0, |acc, p| {
        let [l, w, h] = p;
        let surface = [l * w, w * h, h * l];
        let smallest = surface.iter().min().unwrap();

        acc + surface.iter().sum::<u32>() * 2 + smallest
    })
}

#[aoc(day2, part2)]
pub fn part2_solution(input: &Vec<[u32; 3]>) -> u32 {
    let mut mut_input = input.clone();

    mut_input.iter_mut().fold(0, |acc, p| {
        p.sort();
        let [x, y, _] = *p;

        acc + x * 2 + y * 2 + p.iter().product::<u32>()
    })
}

#[test]
fn it_can_parse() {
    assert_eq!(generate(&"1x4x5\n5x10x19"), vec![[1, 4, 5], [5, 10, 19]]);
}

#[test]
fn it_can_solve() {
    assert_eq!(part1_solution(&vec![[2, 3, 4], [1, 1, 10]]), 58 + 43);
    assert_eq!(part2_solution(&vec![[3, 1, 2], [4, 5, 9]]), 210);
}
