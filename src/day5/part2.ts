import { inputDay5 } from './input';
import { executeProgram, ArrayIOWrapper } from '../common/computer';

export function day5Part2(input: string) {
  const program = input.split(',').map(Number);

  return executeProgram(program, new ArrayIOWrapper([5]));
}

day5Part2(inputDay5).then(console.log);
