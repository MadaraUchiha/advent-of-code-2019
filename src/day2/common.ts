const enum OpCodes {
  Add = 1,
  Mul = 2,
  Halt = 99,
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

        program[resPtr] = arg1 + arg2;
        break;
      }
      case OpCodes.Mul: {
        const arg1Ptr = program[cursor + 1];
        const arg2Ptr = program[cursor + 2];
        const resPtr = program[cursor + 3];

        const arg1 = program[arg1Ptr];
        const arg2 = program[arg2Ptr];

        program[resPtr] = arg1 * arg2;
        break;
      }
      case OpCodes.Halt: {
        halted = true;
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
