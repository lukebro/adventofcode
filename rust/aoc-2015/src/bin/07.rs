// use aoc::*;
use std::collections::HashMap;

fn main() {
    // let input = get_input_str();
    let parsed = generator();

    println!("{:?}", parsed);
}

#[allow(dead_code)]
#[derive(Debug)]
pub enum Gate {
    ASSIGN,
    AND,
    OR,
    LSHIFT,
    RSHIFT,
    NOT,
}

impl Default for Gate {
    fn default() -> Self {
        Self::ASSIGN
    }
}

#[allow(dead_code)]
#[derive(Default, Debug)]
pub struct Instructions {
    value: Option<u16>,
    gate: Gate,
    left: String,
    right: String,
    solved: bool,
}

impl Instructions {
    fn new(input: &str) -> Self {
        let tokens: Vec<&str> = input.split(' ').collect();

        match tokens.len() {
            3 => {
                assert_eq!(tokens[1], "->");
            }
            4 => {
                assert_eq!(tokens[2], "->");
                assert_eq!(tokens[0], "NOT");
            }
            5 => {
                assert_eq!(tokens[3], "->");
            }
            _ => unreachable!(),
        }

        Instructions::default()
    }
}

pub fn generator() -> HashMap<String, Instructions> {
    let wires = HashMap::new();

    wires
}
