use std::cell::RefCell;
use std::rc::{Rc, Weak};

use aoc::*;

fn main() {
    let input = get_input_vec();
    let root = parse(&input);

    println!("Part 1: {}", part_one(&root));
    println!("Part 2: {}", part_two(&root));
}

type Wrapper<T> = Rc<RefCell<T>>;

fn part_one(root: &Wrapper<Directory>) -> u32 {
    const MAX: u32 = 10_0000;

    fn solve(root: &Wrapper<Directory>, max: u32) -> u32 {
        let mut total = 0;

        for dir in root.borrow().sub_directories.iter() {
            let mdir = dir.borrow();

            if mdir.size <= max {
                total += mdir.size;
            }

            total += solve(dir, max);
        }

        total
    }

    solve(&root, MAX)
}

fn part_two(root: &Wrapper<Directory>) -> u32 {
    let need = 30_000_000 - (70_000_000 - root.borrow().size);
    let mut options: Vec<u32> = vec![];

    fn find_options(dir: &Wrapper<Directory>, options: &mut Vec<u32>, need: u32) {
        let b_dir = dir.borrow();
        if b_dir.size < need {
            return;
        }

        options.push(b_dir.size);

        for dir in b_dir.sub_directories.iter() {
            find_options(dir, options, need);
        }
    }

    find_options(root, &mut options, need);

    options.sort_unstable();

    *options.first().unwrap()
}

fn parse(input: &Vec<String>) -> Wrapper<Directory> {
    let root = Directory::new("/");
    let mut cwd = root.clone();

    for line in input {
        let mut parts = line.split_whitespace();

        match parts.next().unwrap() {
            "$" => {
                if let Some("cd") = parts.next() {
                    match parts.next().unwrap() {
                        ".." => {
                            if let Some(next) = cwd.clone().borrow().parent.upgrade() {
                                cwd = next.clone();
                            }
                        }
                        "/" => {
                            cwd = root.clone();
                        }
                        dir => {
                            if let Some(dir) = cwd.clone().borrow().find_sub_directory(dir) {
                                cwd = dir.clone();
                            }
                        }
                    }
                }
            }
            "dir" => {
                let dir = Directory::new(parts.next().unwrap());
                cwd.add_sub_directory(&dir);
            }
            size => {
                cwd.borrow_mut().add_file(size.parse::<u32>().unwrap());
            }
        }
    }

    fn dir_sizes(root: &Wrapper<Directory>) {
        let mut total: u32 = 0;

        for dir in root.borrow().sub_directories.iter() {
            dir_sizes(dir);
            total += dir.borrow().size;
        }

        root.borrow_mut().size += total;
    }

    dir_sizes(&root);

    root
}

#[derive(Debug)]
struct Directory {
    name: String,
    size: u32,
    parent: Weak<RefCell<Directory>>,
    sub_directories: Vec<Wrapper<Directory>>,
}

impl Directory {
    fn new(name: &str) -> Wrapper<Self> {
        Rc::new(RefCell::new(Self {
            name: name.to_owned(),
            size: 0,
            parent: Weak::new(),
            sub_directories: Vec::new(),
        }))
    }

    fn add_file(&mut self, size: u32) {
        self.size += size;
    }

    fn find_sub_directory(&self, name: &str) -> Option<&Wrapper<Directory>> {
        self.sub_directories
            .iter()
            .find(|dir| dir.borrow().name == name)
    }
}

trait AddSubDirectory {
    fn add_sub_directory(&self, child: &Wrapper<Directory>);
}

impl AddSubDirectory for Wrapper<Directory> {
    fn add_sub_directory(&self, child: &Wrapper<Directory>) {
        self.borrow_mut().sub_directories.push(child.clone());
        child.borrow_mut().parent = Rc::downgrade(self);
    }
}
