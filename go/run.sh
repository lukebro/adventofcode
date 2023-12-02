#!/bin/bash

set -ue

YEAR="${1:-2021}"
DAY=`printf %02d ${2#0}`
FLAG="${3:-}"

echo "Day: $DAY Year: $YEAR"

cd "${YEAR}"
go run ./$DAY < "./input/${DAY}.txt" $FLAG
