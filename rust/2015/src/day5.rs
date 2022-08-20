use fancy_regex::Regex;

pub fn has_bad_strings(input: &str) -> bool {
    let bad_words: [&str; 4] = ["ab", "cd", "pq", "xy"];

    for word in bad_words.iter() {
        if input.contains(word) {
            return true;
        }
    }

    false
}

pub fn has_letter_twice(input: &str) -> bool {
    let input = input.as_bytes();

    for i in 0..(input.len() - 1) {
        if input[i] == input[i + 1] {
            return true;
        }
    }

    false
}

pub fn repeats_letter_between(input: &str) -> bool {
    let input = input.as_bytes();

    for i in 0..(input.len() - 2) {
        if input[i] == input[i + 2] {
            return true;
        }
    }

    false
}

pub fn two_letter_appear_twice(input: &str) -> bool {
    let test = Regex::new(r"([a-z]{2}).*\1").unwrap();

    test.is_match(input).unwrap()
}

pub fn has_three_vowels(input: &str) -> bool {
    let vowels: [char; 5] = ['a', 'e', 'i', 'o', 'u'];
    let mut count = 0;

    for c in input.chars() {
        if vowels.contains(&c) {
            count += 1;

            if count == 3 {
                return true;
            }
        }
    }

    false
}

pub fn is_nice(input: &str) -> bool {
    !has_bad_strings(input) && has_letter_twice(input) && has_three_vowels(input)
}

pub fn is_nicer(input: &str) -> bool {
    repeats_letter_between(input) && two_letter_appear_twice(input)
}

#[aoc(day5, part1)]
pub fn part1_solution(input: &str) -> u32 {
    input.lines().filter(|w| is_nice(&w)).count() as u32
}

#[aoc(day5, part2)]
pub fn part2_solution(input: &str) -> u32 {
    input.lines().filter(|w| is_nicer(&w)).count() as u32
}

#[test]
fn is_word_bad_or_good() {
    assert_eq!(has_bad_strings(&"hello world"), false);
    assert_eq!(has_bad_strings(&"hello pq world"), true);

    assert_eq!(has_letter_twice(&"hello pq world"), true);
    assert_eq!(has_letter_twice(&"helo pq world"), false);

    assert_eq!(has_three_vowels(&"helo pq world"), true);
    assert_eq!(has_three_vowels(&"helo pq wrld"), false);
}

#[test]
fn good_words() {
    assert_eq!(is_nice(&"ugknbfddgicrmopn"), true);
    assert_eq!(is_nice(&"aaa"), true);
}

#[test]
fn other_tests() {
    assert_eq!(two_letter_appear_twice(&"xyxy"), true);
    // assert_eq!(two_letter_appear_twice(&"aaab"), false);
}
