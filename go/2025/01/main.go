package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := make([]string, 0, 5120)

	for sc.Scan() {
		lines = append(lines, sc.Text())
	}

	part1(lines)
	part2(lines)
}

func part1(lines []string) {
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

	fmt.Println("Part1:", r)
}

func part2(lines []string) {
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

	fmt.Println("Part2:", r)
}
