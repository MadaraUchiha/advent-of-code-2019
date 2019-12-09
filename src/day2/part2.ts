import { executeProgramAndGetFirstValue } from '../common/computer';
import { inputDay2 } from './input';

const DESIRED_OUTPUT = 19690720;

export async function day2Part2(input: string) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const program = input.split(',').map(Number); // Initiate memory anew each time

      program[1] = noun;
      program[2] = verb;

      try {
        const result = await executeProgramAndGetFirstValue(program);
        if (result === DESIRED_OUTPUT) {
          return 100 * noun + verb;
        }
      } catch {
        // Ignore the universe imploding.
        continue;
      }
    }
  }

  return -1; // Oops!
}

day2Part2(inputDay2).then(console.log);
