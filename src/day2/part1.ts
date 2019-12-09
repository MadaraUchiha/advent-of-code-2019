import { inputDay2 } from './input';
import { executeProgramAndGetFirstValue } from '../common/computer';

export async function day2Part1(input: string) {
  const cells = input.split(',').map(Number);

  cells[1] = 12;
  cells[2] = 2;

  return await executeProgramAndGetFirstValue(cells);
}
(async () => {
  console.log(await day2Part1(inputDay2));
})();
