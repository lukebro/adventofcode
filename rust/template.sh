#!/bin/bash
set -ue

YEAR="${1:-2021}"
DAY=`printf %02d ${2:-1}`

echo "Day: $DAY Year: $YEAR"

cp -n template.rs "./aoc-${YEAR}/src/bin/${DAY}.rs"

./download-input.sh $YEAR $DAY