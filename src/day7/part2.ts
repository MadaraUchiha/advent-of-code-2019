import { inputDay7 } from './input';
import { executeProgram, ArrayIOWrapper, IOWrapper } from '../common/computer';
import { maxBy } from 'lodash';
import { permutator } from './common';

export async function day7Part2(input: string) {
  const permutations = permutator([5, 6, 7, 8, 9]);
  const results: { permutation: number[]; value: number }[] = [];
  for (const permutation of permutations) {
    const program = input.split(',').map(Number);
    const ioWrappers = [
      new BlockingIOWrapper([permutation[0], 0]),
      new BlockingIOWrapper([permutation[1]]),
      new BlockingIOWrapper([permutation[2]]),
      new BlockingIOWrapper([permutation[3]]),
      new BlockingIOWrapper([permutation[4]]),
    ];

    await Promise.all(
      ioWrappers.map(
        async (wrapper, i, wrappers) =>
          await executeProgram(program, wrapper, wrappers[(i + 1) % 5]),
      ),
    );
    const value = await ioWrappers[0].read();
    results.push({ permutation, value });
  }

  return maxBy(results, 'value');
}

class BlockingIOWrapper implements IOWrapper {
  private resolver?: (value: number) => void;

  public constructor(public memory: number[]) {}

  async read() {
    const value = this.memory.shift();
    if (typeof value === 'number') {
      return value;
    }
    if (this.resolver) {
      throw new Error('Blocked twice. Universe implodes');
    }
    await new Promise(resolve => (this.resolver = resolve));
    return this.memory.shift()!;
  }

  write(value: number) {
    this.memory.push(value);
    if (this.resolver) {
      this.resolver(value);
      this.resolver = undefined;
    }
  }
}

day7Part2(inputDay7)
  .then(console.log)
  .catch(console.error);
