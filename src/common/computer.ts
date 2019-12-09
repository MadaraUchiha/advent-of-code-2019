import readline from 'readline';

const enum OpCodes {
  Add = 1,
  Mul = 2,
  Input = 3,
  Output = 4,
  Halt = 99,
}

const enum Modes {
  Position = 0,
  Value = 1,
}

export async function executeProgramAndGetFirstValue(program: number[]) {
  await executeProgram(program);

  return program[0];
}

function parseOpCode(opcode: number) {
  const actualOpcode = opcode % 100;
  const rest = Math.floor(opcode / 100);

  const restArray: Modes[] = [...String(rest)].map(Number).reverse();

  return [actualOpcode, ...restArray];
}

export async function executeProgram(program: number[], input: number[] = []) {
  const readlineInterface = readline.createInterface(
    process.stdin,
    process.stdout,
  );

  const askInput = async (question: string) =>
    await new Promise<string>(resolve =>
      readlineInterface.question(question, resolve),
    );
  try {
    const getWithMode = (value: number, mode: Modes = Modes.Position) => {
      switch (mode) {
        case Modes.Position:
          return program[value];
        case Modes.Value:
          return value;
      }
    };

    const output: number[] = [];
    let halted = false;
    let cursor = 0;
    while (!halted) {
      if (cursor > program.length) {
        throw new Error(`Out of bounds. Universe imploding`);
      }
      let [opcode, ...modes] = parseOpCode(program[cursor++]);

      switch (opcode) {
        case OpCodes.Add: {
          const [arg1Mode, arg2Mode] = modes;
          const arg1Ptr = program[cursor++];
          const arg2Ptr = program[cursor++];
          const resPtr = program[cursor++];

          const arg1 = getWithMode(arg1Ptr, arg1Mode);
          const arg2 = getWithMode(arg2Ptr, arg2Mode);

          program[resPtr] = arg1 + arg2;
          break;
        }
        case OpCodes.Mul: {
          const [arg1Mode, arg2Mode] = modes;
          const arg1Ptr = program[cursor++];
          const arg2Ptr = program[cursor++];
          const resPtr = program[cursor++];

          const arg1 = getWithMode(arg1Ptr, arg1Mode);
          const arg2 = getWithMode(arg2Ptr, arg2Mode);

          program[resPtr] = arg1 * arg2;
          break;
        }
        case OpCodes.Input: {
          const storeDestination = program[cursor++];
          const inputValue =
            input.shift() ?? (await askInput('Please provide an input: '));

          program[storeDestination] = Number(inputValue);
          break;
        }
        case OpCodes.Output: {
          const [arg1Mode] = modes;
          const outputValue = getWithMode(program[cursor++], arg1Mode);

          output.push(outputValue);
          break;
        }
        case OpCodes.Halt: {
          halted = true;
          break;
        }
        default: {
          throw new Error(
            `Unknown opcode ${opcode} at cursor ${cursor}, universe imploding`,
          );
        }
      }
    }

    return output;
  } finally {
    readlineInterface.close();
  }
}
