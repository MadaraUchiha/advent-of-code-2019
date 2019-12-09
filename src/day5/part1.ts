import { inputDay5 } from './input';
import { executeProgram } from '../common/computer';

export async function day5Part1(input: string) {
  const program = input.split(',').map(Number);

  return executeProgram(program, [1]);
}

(async () => {
  console.log(await day5Part1(inputDay5));
})();
