import { inputDay9 } from './input';
import { executeProgram, ArrayIOWrapper } from '../common/computer';

export async function day9Part1(input: string) {
  const program = input.split(',').map(Number);

  return (await executeProgram(program, new ArrayIOWrapper([1]))).toString();
}

day9Part1(inputDay9).then(console.log);
