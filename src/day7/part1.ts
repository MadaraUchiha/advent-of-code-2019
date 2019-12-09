import { inputDay7 } from './input';
import { executeProgram, ArrayIOWrapper } from '../common/computer';
import { maxBy } from 'lodash';
import { permutator } from './common';

export async function day7Part1(input: string) {
  const permutations = permutator([0, 1, 2, 3, 4]);
  const results: { permutation: number[]; value: number }[] = [];
  for (const permutation of permutations) {
    let value = 0;
    for (let thruster = 0; thruster < 5; thruster++) {
      const program = input.split(',').map(Number);
      const output = await executeProgram(
        program,
        new ArrayIOWrapper([permutation[thruster], value]),
      );
      value = output[0];
    }
    results.push({ permutation, value });
  }

  return maxBy(results, 'value');
}

day7Part1(inputDay7).then(console.log);
