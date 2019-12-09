import { inputDay2 } from './input';
import { executeProgramAndGetFirstValue } from '../common/computer';

export function day2Part1(input: string) {
  const cells = input.split(',').map(Number);

  cells[1] = 12;
  cells[2] = 2;

  return executeProgramAndGetFirstValue(cells);
}
console.log(day2Part1(inputDay2));
