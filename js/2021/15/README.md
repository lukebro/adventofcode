# Err...

This one took me a couple days. I naively implemented the first pseudocode example on the [wikipage](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode).

It was enough to answer part one, but when it came to part two it was too slow because I had to sort the queue of up to 250,000 items (or if I lazily populated the queue it would just get slower and slower).

Anyways... Had to use a Binary MinHeap [as the queue](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue) which made it finish much much faster!


```sh
Advent of Code
          2021

Day: 15
Part 1: 696 in 18ms
Part 2: 2952 in 323ms
```
