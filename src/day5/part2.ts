import { inputDay5 } from './input';
import { executeProgram } from '../common/computer';

export function day5Part2(input: string) {
  const program = input.split(',').map(Number);

  return executeProgram(program, [5]);
}

console.log(day5Part2(inputDay5));
