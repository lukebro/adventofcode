package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)

	var max int
	var sum int
	for sc.Scan() {
		next := sc.Text()

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

	fmt.Println("Part 1: ", max)
}
