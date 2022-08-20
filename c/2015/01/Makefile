CC=gcc
CFLAGS=-Wall -Wextra -std=c11 -pedantic -Wno-unused-parameter
INPUT=./input.txt

.PHONY: test

test: main $(INPUT)
	time ./main $(INPUT)

main: main.c
	$(CC) $(CFLAGS) -o main main.c
