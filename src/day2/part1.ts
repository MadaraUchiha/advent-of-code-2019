import { inputDay2 } from './input';

const enum OpCodes {
  Add = 1,
  Mul = 2,
  Halt = 99,
}

export function day2Part1(input: string) {
  const cells = input.split(',').map(Number);

  cells[1] = 12;
  cells[2] = 2;

  return executeProgram(cells);
}

export function executeProgram(program: number[]) {
  let halted = false;
  for (let cursor = 0; cursor <= program.length; cursor += 4) {
    let opcode = program[cursor];
    switch (opcode) {
      case OpCodes.Add: {
        const arg1Ptr = program[cursor + 1];
        const arg2Ptr = program[cursor + 2];
        const resPtr = program[cursor + 3];

        const arg1 = program[arg1Ptr];
        const arg2 = program[arg2Ptr];

        console.log(`ADD: Taking ${arg1} from ${arg1Ptr} and ${arg2} from ${arg2Ptr} (Result: ${arg1 + arg2}) and storing in ${resPtr}`)

        program[resPtr] = arg1 + arg2;
        break;
      }
      case OpCodes.Mul: {
        const arg1Ptr = program[cursor + 1];
        const arg2Ptr = program[cursor + 2];
        const resPtr = program[cursor + 3];

        const arg1 = program[arg1Ptr];
        const arg2 = program[arg2Ptr];

        console.log(`MUL: Taking ${arg1} from ${arg1Ptr} and ${arg2} from ${arg2Ptr} (Result: ${arg1 * arg2}) and storing in ${resPtr}`)

        program[resPtr] = arg1 * arg2;
        break;
      }
      case OpCodes.Halt: {
        halted = true;
        console.log('HALT: Halting program')
        break;
      }
      default: {
        throw new Error(`Unknown opcode ${opcode}, universe imploding`);
      }
    }
    if (halted) {
      break;
    }
  }

  return program[0];
}

console.log(day2Part1(inputDay2));