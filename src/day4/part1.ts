import { inputDay4 } from './input';
import { increasing, hasDoubleDigits } from './common';

export function day4Part1(input: string) {
  const [min, max] = input.split('-').map(Number);

  const possiblePasswords = new Set<number>();

  for (let i = min; i <= max; i++) {
    const s = i.toString(10);

    if (hasDoubleDigits(s) && increasing(s)) {
      possiblePasswords.add(i);
    }
  }

  return possiblePasswords.size;
}

console.log(day4Part1(inputDay4));