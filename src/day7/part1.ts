import { inputDay7 } from './input';
import { executeProgram } from '../common/computer';
import { maxBy } from 'lodash';

export function day7Part1(input: string) {
  const permutations = permutator([0, 1, 2, 3, 4]);
  const results: { permutation: number[]; value: number }[] = [];
  for (const permutation of permutations) {
    let value = 0;
    for (let thruster = 0; thruster < 5; thruster++) {
      const program = input.split(',').map(Number);
      const output = executeProgram(program, [permutation[thruster], value]);
      value = output[0];
    }
    results.push({ permutation, value });
  }

  return maxBy(results, 'value');
}

/**
 * Return all premutations of an array
 * @see https://stackoverflow.com/a/20871714/871050
 * @param inputArr
 */
function permutator<T>(inputArr: T[]): T[][] {
  let result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

console.log(day7Part1(inputDay7));
