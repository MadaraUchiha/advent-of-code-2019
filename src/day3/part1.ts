import { inputDay3 } from './input';
import { generateGrid } from './common';
import { uniqBy } from 'lodash';

export function day3Part1(input: string) {
  const wires = input.split('\n').map(wire => wire.split(','));

  const grid = generateGrid(wires);

  const collisionsWithoutSelf = Object.entries(grid)
    .map(([coords, wires]) => [coords, uniqBy(wires, wire => wire.wire)] as const)
    .filter(([_, wires]) => wires.length > 1);

  const distances = collisionsWithoutSelf.map(([coords]) => {
    const [x, y] = coords.split(',').map(Number);
    return Math.abs(x) + Math.abs(y);
  }).sort((a, b) => a - b);

  distances.splice(distances.indexOf(0), 1); // Remove the origin intersection.

  return Math.min(...distances);
}

console.log(day3Part1(inputDay3));