# [Advent of Code](https://adventofcode.com/) Rust Solutions

Advent of Code done in Rust to learn Rust.

## Prerequisites

- Install and setup [aoc-cli](https://github.com/scarvalhojr/aoc-cli) to download inputs (unless they already exist)

## How to run

Run a specific problem.

```sh
./run.sh YEAR DAY
```

or manually

```sh
cd aoc-2021
cargo run --bin 01 -r < ./input/01.txt
```

## Generate template

Creates a binary for the day/year from a template.
It will also call and download input.

```sh
./template.sh YEAR DAY
```

## Download Input

Download input from any day. It uses [aoc-cli](https://github.com/scarvalhojr/aoc-cli), so this needs to be setup first.

```sh
./download-input.sh YEAR DAY
```

Will download input into: `./aoc-${YEAR}/input/${DAY}.txt`
