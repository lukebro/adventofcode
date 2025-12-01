package main

import (
	"aoc/aoc"
	"strconv"
)

func main() {
	aoc.Run[int, struct{}](part1, nil)
}

func part1() int {
	lines := aoc.ReadLines()

	var max int
	var sum int
	for _, next := range lines {
		if next == "" {
			if sum > max {
				max = sum
			}

			sum = 0
		} else {
			value, _ := strconv.Atoi(next)
			sum += value
		}
	}

	return max
}
