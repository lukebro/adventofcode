#!/bin/bash
set -ue

YEAR="${1:-2021}"
DAY=`printf %02d ${2:-1}`
FLAG="${3:-}"

echo "Day: $DAY Year: $YEAR"

cd "aoc-${YEAR}" && cargo run --bin $DAY < "./input/${DAY}.txt" $FLAG