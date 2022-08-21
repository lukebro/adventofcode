#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <string.h>
#include <stdbool.h>

// the bigger N the bigger the hash map is
// the faster are the look ups (less collisions)
#define N 8196

char *buffer = 0;
int buffer_size = 0;

typedef struct Item
{
  int x;
  int y;
  int count;
} Item;

Item *input[N];

unsigned long get_key(int x, int y);
int insert_or_update(int x, int y);
void free_input();

int main(int argc, char *argv[])
{
  assert(argc == 2 && "Provide input as second argument");

  FILE *fp = fopen(argv[1], "r");

  if (fp == NULL)
  {
    perror(argv[1]);
    exit(1);
  }

  fseek(fp, 0, SEEK_END);
  buffer_size = ftell(fp);
  fseek(fp, 0, SEEK_SET);

  buffer = (char *)malloc(buffer_size);
  if (buffer)
  {
    fread(buffer, 1, buffer_size, fp);
  }

  fclose(fp);

  // Part 1
  {
    int x = 0, y = 0;
    int total = 0;

    for (int i = 0; i < buffer_size; i++)
    {
      switch (buffer[i])
      {
      case '^':
        y += 1;
        break;
      case 'v':
        y -= 1;
        break;
      case '>':
        x += 1;
        break;
      case '<':
        x -= 1;
        break;
      }

      total += insert_or_update(x, y);
    }

    printf("Part 1: %d\n", total);
  }

  free_input();

  // Part 2
  {
    int x1 = 0, y1 = 0;
    int x2 = 0, y2 = 0;
    bool robot = false;
    int total = 0;

    for (int i = 0; i < buffer_size; i++)
    {
      int *x = robot ? &x2 : &x1;
      int *y = robot ? &y2 : &y1;

      switch (buffer[i])
      {
      case '^':
        *y += 1;
        break;
      case 'v':
        *y -= 1;
        break;
      case '>':
        *x += 1;
        break;
      case '<':
        *x -= 1;
        break;
      }

      if (robot)
      {
        total += insert_or_update(x2, y2);
      }
      else
      {
        total += insert_or_update(x1, y1);
      }

      robot = !robot;
    }

    printf("Part 2: %d\n", total);
  }

  free_input();
  free(buffer);

  return 0;
}

void free_input()
{
  for (int i = 0; i < N; ++i)
  {
    if (input[i])
    {
      free(input[i]);
      input[i] = NULL;
    }
  }
}

// return 1 if added
// return 0 if updated
int insert_or_update(int x, int y)
{
  unsigned long key = get_key(x, y);

  unsigned long original = key;

  while (input[key] != NULL)
  {
    Item *value = input[key];

    if (value->x == x && value->y == y)
    {
      value->count += 1;
      return 0;
    }

    ++key;
    key %= N;

    if (key == original)
    {
      // i would like to use -1 but unsigned
      // N is fine though because we modulo it above
      key = N;
      break;
    }
  }

  if (key == N)
  {
    fprintf(stderr, "Error: Ran out of space in hash map: size %d", N);
    exit(1);
  }

  Item *value = (Item *)malloc(sizeof(Item));

  value->x = x;
  value->y = y;
  value->count = 1;

  input[key] = value;

  return 1;
}

unsigned long get_key(int x, int y)
{
  return (((unsigned long)x * y) % N);
}
