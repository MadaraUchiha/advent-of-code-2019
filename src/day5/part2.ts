import { inputDay5 } from './input';
import { executeProgram } from '../common/computer';

export async function day5Part2(input: string) {
  const program = input.split(',').map(Number);

  return executeProgram(program, [5]);
}

(async () => {
  console.log(await day5Part2(inputDay5));
})();
