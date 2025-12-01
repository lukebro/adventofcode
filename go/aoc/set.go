package aoc

import "fmt"

type void struct{}

var member void

type set[T comparable] struct {
	m map[T]void
}

func NewSet[T comparable]() *set[T] {
	s := &set[T]{}
	s.m = make(map[T]void)
	return s
}

func (s *set[T]) Add(value T) {
	s.m[value] = member
}

func (s *set[T]) Remove(value T) {
	delete(s.m, value)
}

func (s *set[T]) Contains(value T) bool {
	_, c := s.m[value]
	return c
}

func (s *set[T]) Has(value T) bool {
	return s.Contains(value)
}

func (s *set[T]) Size() int {
	return len(s.m)
}

func (s *set[T]) Clear() {
	s.m = make(map[T]void)
}

func (s *set[T]) Clone() *set[T] {
	clone := NewSet[T]()
	for value := range s.m {
		clone.Add(value)
	}
	return clone
}

func (s *set[T]) Iter() <-chan T {
	ch := make(chan T)

	go func() {
		for value := range s.m {
			ch <- value
		}
		close(ch)
	}()

	return ch
}

func (s *set[T]) Values() []T {
	values := make([]T, 0, len(s.m))
	for value := range s.m {
		values = append(values, value)
	}
	return values
}

func (s *set[T]) String() string {
	return fmt.Sprintf("%v", s.Values())
}
