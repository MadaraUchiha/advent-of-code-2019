export const hasDoubleDigits = (s: string) => /(\d)\1/.test(s);
export const increasing = (s: string) =>
  s[0] <= s[1] &&
  s[1] <= s[2] &&
  s[2] <= s[3] &&
  s[3] <= s[4] &&
  s[4] <= s[5];

export const hasDoubleDigitsButNoMore = (s: string) => /(\d)\1/.test(s.replace(/(\d)\1\1+/g, ''));