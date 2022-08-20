#include <stdlib.h>
#include <stdio.h>
#include <assert.h>

#define N 10000
int input[N];
int size = 0;

int main(int argc, char *argv[])
{
  assert(argc == 2 && "Provide input as second argument");

  FILE *fp = fopen(argv[1], "r");

  if (fp == NULL)
  {
    perror(argv[1]);
    exit(1);
  }

  int c;
  while ((c = fgetc(fp)) != EOF)
  {
    input[size++] = c;
  }

  fclose(fp);

  // Part 1
  {
    int floor = 0;
    for (int i = 0; i < size; ++i)
    {
      if (input[i] == '(')
      {
        floor += 1;
      }
      else
      {
        floor -= 1;
      }
    }

    printf("Part 1: %d\n", floor);
  }

  // Part 2
  {
    int floor = 0;
    int i;
    for (i = 0; i < size; ++i)
    {
      if (input[i] == '(')
      {
        floor += 1;
      }
      else
      {
        floor -= 1;
      }

      if (floor == -1)
      {
        break;
      }
    }

    printf("Part 2: %d\n", i);
  }
}
