use std::io::{self, BufRead};

pub fn get_input_vec() -> Vec<String> {
    io::stdin()
        .lock()
        .lines()
        .filter_map(|x| {
            let line = x.unwrap();
            let clean = !line.trim().is_empty();

            clean.then_some(line)
        })
        .collect()
}

pub fn get_input_str() -> String {
    get_input_vec().join("\n")
}
