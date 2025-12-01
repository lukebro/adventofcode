package aoc

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"os"
)

var raw_bytes []byte

func setup() {
	if raw_bytes != nil {
		return
	}

	data, err := io.ReadAll(os.Stdin)

	if err != nil {
		panic(err)
	}

	raw_bytes = data
}

// Allocate a slice of strings and read all lines from stdin into it.
func ReadLines() []string {
	setup()

	sc := bufio.NewScanner(bytes.NewReader(raw_bytes))
	lines := make([]string, 0, 512)

	for sc.Scan() {
		lines = append(lines, sc.Text())
	}

	return lines
}

// Allocate a single string and read all input from stdin into it.
func ReadAll() string {
	setup()
	return string(raw_bytes)
}

func Run[T1, T2 any](part1 func() T1, part2 func() T2) {
	if part1 != nil {
		result1 := part1()
		fmt.Println("Part 1:", result1)
	}

	if part2 != nil {
		result2 := part2()
		fmt.Println("Part 2:", result2)
	}

}
