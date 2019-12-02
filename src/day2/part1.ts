import { inputDay2 } from './input';
import { executeProgram } from './common';

export function day2Part1(input: string) {
  const cells = input.split(',').map(Number);

  cells[1] = 12;
  cells[2] = 2;

  return executeProgram(cells);
}

console.log(day2Part1(inputDay2));