/**
 * Return all premutations of an array
 * @see https://stackoverflow.com/a/20871714/871050
 * @param inputArr
 */
export function permutator<T>(inputArr: T[]): T[][] {
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
