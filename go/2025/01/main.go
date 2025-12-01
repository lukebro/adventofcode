package main

import (
	"aoc/aoc"
	"strconv"
)

func main() {
	aoc.Run(part1, part2)
}

func part1() int {
	lines := aoc.ReadLines()
	dial := 50
	r := 0

	for _, line := range lines {
		num, _ := strconv.Atoi(line[1:])

		if line[0] == 'L' {
			num = -num
		}

		dial += num
		dial = ((dial % 100) + 100) % 100

		if dial == 0 {
			r += 1
		}
	}

	return r
}

func part2() int {
	lines := aoc.ReadLines()
	dial := 50
	r := 0

	for _, line := range lines {
		num, _ := strconv.Atoi(line[1:])

		if line[0] == 'L' {
			num = -num
		}

		zero := dial == 0
		dial += num

		if dial == 0 {
			r += 1
		} else if dial < 0 {
			if !zero {
				r += 1
			}
			r += (-dial) / 100
			dial = ((dial % 100) + 100) % 100
		} else if dial >= 100 {
			r += dial / 100
			dial = dial % 100
		}
	}

	return r
}
