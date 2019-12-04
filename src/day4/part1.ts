import { inputDay4 } from './input';

export function day4Part1(input: string) {
  const [min, max] = input.split('-').map(Number);

  const possiblePasswords = new Set<number>();

  for (let i = min; i <= max; i++) {
    const s = i.toString(10);

    const hasDoubleDigits = /(\d)\1/.test(s);
    const increasing =
      s[0] <= s[1] &&
      s[1] <= s[2] &&
      s[2] <= s[3] &&
      s[3] <= s[4] &&
      s[4] <= s[5];

    if (hasDoubleDigits && increasing) {
      possiblePasswords.add(i);
    }
  }

  return possiblePasswords.size;
}

console.log(day4Part1(inputDay4));