import { inputDay5 } from './input';
import { executeProgram, ArrayIOWrapper } from '../common/computer';

export async function day5Part1(input: string) {
  const program = input.split(',').map(Number);

  return (await executeProgram(program, new ArrayIOWrapper([1]))).pop();
}

day5Part1(inputDay5).then(console.log);
