#!/bin/bash

set -ue

YEAR="${1:-2021}"
DAY=`printf %02d ${2#0}`

echo "Day: $DAY Year: $YEAR"

mkdir -p "${YEAR}/input"
aoc download -d $DAY -y $YEAR -f "./${YEAR}/input/${DAY}.txt"
