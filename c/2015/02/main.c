#include <stdlib.h>
#include <stdio.h>
#include <assert.h>
#include <string.h>

#define N 2048
char input[N][10];
int size = 0;

int min(int a, int b);

int main(int argc, char *argv[])
{
  assert(argc == 2 && "Provide input as second argument");

  FILE *fp = fopen(argv[1], "r");

  if (fp == NULL)
  {
    perror(argv[1]);
    exit(1);
  }

  char buffer[10];
  while (fgets(buffer, sizeof(buffer), fp) != NULL)
  {
    strcpy(input[size++], buffer);
  }

  fclose(fp);

  // Part 1
  {
    int total = 0;
    for (int i = 0; i < size; i++)
    {
      int l, w, h;
      int args = sscanf(input[i], "%dx%dx%d", &l, &w, &h);
      assert(args == 3);

      int lw = l * w;
      int hw = w * h;
      int hl = h * l;

      total += 2 * lw + 2 * hw + 2 * hl + min(lw, min(hw, hl));
    }

    printf("Part 1: %d\n", total);
  }

  // Part 2
  {

    int total = 0;
    for (int i = 0; i < size; i++)
    {
      int l, w, h;
      int args = sscanf(input[i], "%dx%dx%d", &l, &w, &h);
      assert(args == 3);

      total += l * w * h + min(l + h, min(l + w, w + h)) * 2;
    }

    printf("Part 2: %d\n", total);
  }

  return 0;
}

int min(int a, int b)
{
  return a < b ? a : b;
}
