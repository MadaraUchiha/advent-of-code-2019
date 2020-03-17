const enum OpCodes {
  Add = 1,
  Mul = 2,
  Input = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  AdjustRelativeBase = 9,
  Halt = 99,
}

const enum Modes {
  Position = 0,
  Value = 1,
  Relative = 2,
}

export interface IOWrapper {
  memory: number[];
  read: () => Promise<number>;
  write: (arg: number) => void;
}

export class ArrayIOWrapper implements IOWrapper {
  public constructor(public memory: number[] = []) {}
  async read() {
    const n = this.memory.shift();
    if (typeof n !== 'number') {
      throw new Error('Tried to read from empty memory. Universe implodes');
    }
    return n;
  }
  write(n: number) {
    this.memory.push(n);
  }
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

export async function executeProgram(
  program: number[],
  input: IOWrapper = new ArrayIOWrapper(),
  output: IOWrapper = new ArrayIOWrapper(),
) {
  const getWithMode = (value: number, mode: Modes = Modes.Position) => {
    switch (mode) {
      case Modes.Position:
        return program[value] ?? 0;
      case Modes.Value:
        return value ?? 0;
      case Modes.Relative:
        return program[value + relativeBase] ?? 0;
    }
  };

  const setWithMode = (ptrValue: number, mode: Modes = Modes.Position) => {
    switch (mode) {
      case Modes.Position:
        return ptrValue;
      case Modes.Relative:
        return ptrValue + relativeBase;
      default:
        throw new Error(
          'Should not have set with mode other than position or relative. Universe imploding',
        );
    }
  };

  let halted = false;
  let cursor = 0;
  let relativeBase = 0;
  while (!halted) {
    if (cursor > program.length) {
      throw new Error(`Out of bounds. Universe imploding`);
    }
    let [opcode, ...modes] = parseOpCode(program[cursor++]) as [
      OpCodes,
      ...Modes[],
    ];

    switch (opcode) {
      case OpCodes.Add: {
        const [arg1Mode, arg2Mode, resMode] = modes;
        const arg1Ptr = program[cursor++];
        const arg2Ptr = program[cursor++];
        const resPtr = program[cursor++];

        const arg1 = getWithMode(arg1Ptr, arg1Mode);
        const arg2 = getWithMode(arg2Ptr, arg2Mode);

        program[setWithMode(resPtr, resMode)] = arg1 + arg2;
        break;
      }
      case OpCodes.Mul: {
        const [arg1Mode, arg2Mode, resMode] = modes;
        const arg1Ptr = program[cursor++];
        const arg2Ptr = program[cursor++];
        const resPtr = program[cursor++];

        const arg1 = getWithMode(arg1Ptr, arg1Mode);
        const arg2 = getWithMode(arg2Ptr, arg2Mode);

        program[setWithMode(resPtr, resMode)] = arg1 * arg2;
        break;
      }
      case OpCodes.Input: {
        const [destMode] = modes;

        const storeDestination = program[cursor++];
        const inputValue = await input.read();

        program[setWithMode(storeDestination, destMode)] = Number(inputValue);
        break;
      }
      case OpCodes.Output: {
        const [arg1Mode] = modes;
        const outputValue = getWithMode(program[cursor++], arg1Mode);

        output.write(outputValue);
        break;
      }
      case OpCodes.JumpIfTrue: {
        const [arg1Mode, arg2Mode] = modes;
        const valueUnderTest = getWithMode(program[cursor++], arg1Mode);
        const jumpDestination = getWithMode(program[cursor++], arg2Mode);

        if (valueUnderTest !== 0) {
          cursor = jumpDestination;
        }
        break;
      }
      case OpCodes.JumpIfFalse: {
        const [arg1Mode, arg2Mode] = modes;
        const valueUnderTest = getWithMode(program[cursor++], arg1Mode);
        const jumpDestination = getWithMode(program[cursor++], arg2Mode);

        if (valueUnderTest === 0) {
          cursor = jumpDestination;
        }
        break;
      }
      case OpCodes.LessThan: {
        const [arg1Mode, arg2Mode, resMode] = modes;
        const arg1Ptr = program[cursor++];
        const arg2Ptr = program[cursor++];
        const resPtr = program[cursor++];

        const arg1 = getWithMode(arg1Ptr, arg1Mode);
        const arg2 = getWithMode(arg2Ptr, arg2Mode);

        program[setWithMode(resPtr, resMode)] = arg1 < arg2 ? 1 : 0;

        break;
      }
      case OpCodes.Equals: {
        const [arg1Mode, arg2Mode, resMode] = modes;
        const arg1Ptr = program[cursor++];
        const arg2Ptr = program[cursor++];
        const resPtr = program[cursor++];

        const arg1 = getWithMode(arg1Ptr, arg1Mode);
        const arg2 = getWithMode(arg2Ptr, arg2Mode);

        program[setWithMode(resPtr, resMode)] = arg1 === arg2 ? 1 : 0;

        break;
      }
      case OpCodes.AdjustRelativeBase: {
        const [arg1Mode] = modes;
        const arg1Ptr = program[cursor++];

        const arg1 = getWithMode(arg1Ptr, arg1Mode);

        relativeBase += arg1;
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

  return output.memory;
}
