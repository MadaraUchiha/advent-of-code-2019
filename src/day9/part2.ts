import { inputDay9 } from './input';
import { executeProgram, ArrayIOWrapper } from '../common/computer';

export async function day9Part2(input: string) {
  const program = input.split(',').map(Number);

  return (await executeProgram(program, new ArrayIOWrapper([2]))).toString();
}

day9Part2(inputDay9).then(console.log);
