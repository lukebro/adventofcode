package main

import (
	"aoc/aoc"
	"math"
	"strconv"
	"strings"
)

func main() {
	aoc.Run(part1, part2)
}

type Range struct {
	start int
	end   int
}

func part1() int {
	input := aoc.ReadAll()
	parts := strings.Split(input, ",")
	ranges := make([]Range, len(parts))

	for i, r := range ranges {
		rangeParts := strings.Split(parts[i], "-")
		r.start, _ = strconv.Atoi(rangeParts[0])
		r.end, _ = strconv.Atoi(rangeParts[1])
		ranges[i] = r
	}

	sum := 0

	for r := range ranges {
		for i := ranges[r].start; i <= ranges[r].end; i++ {
			length := int(math.Log10(float64(i))) + 1

			if length%2 == 0 {
				half := length / 2
				multiplier := int(math.Pow10(half))
				firstHalf := i / multiplier
				secondHalf := i % multiplier

				if firstHalf == secondHalf {
					// fmt.Printf("invalid range %v for number %v-%v\n", i, ranges[r].start, ranges[r].end)
					sum += i
				}
			}
		}
		// fmt.Printf("\n")
	}

	return sum
}

func part2() int {
	input := aoc.ReadAll()
	parts := strings.Split(input, ",")
	ranges := make([]Range, len(parts))

	for i, r := range ranges {
		rangeParts := strings.Split(parts[i], "-")
		r.start, _ = strconv.Atoi(rangeParts[0])
		r.end, _ = strconv.Atoi(rangeParts[1])
		ranges[i] = r
	}

	sum := 0

	// First we check what multiples will fit into the number (j loop) Then we
	// get a "mask" (multiplier) and start popping off that multiplier off the
	// end. Once we get two parts that are not equal, we can break out early. If
	// we get to the front and all parts were equal, we have a valid number.
	// Erm.. Well "invalid" in terms of the puzzle. :)
	for r := range ranges {
		for i := ranges[r].start; i <= ranges[r].end; i++ {
			length := int(math.Log10(float64(i))) + 1

			for j := 2; j <= length; j++ {
				if length%j == 0 {
					size := length / j
					multiplier := int(math.Pow10(size))

					curr := i % multiplier
					n := i / multiplier
					found := true
					for n > 0 {
						next := n % multiplier

						// fmt.Println(i, curr, next)
						if curr != next {
							found = false
							break
						}

						curr = next
						n = n / multiplier
					}

					if found {
						sum += i
						// fmt.Println(i)
						break
					}
				}
			}
		}
		// fmt.Printf("\n")
	}

	return sum
}
