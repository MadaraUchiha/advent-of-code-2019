import { inputDay3 } from './input';
import { generateGrid } from './common';
import { uniqBy, sum } from 'lodash';

export function day3Part1(input: string) {
  const wires = input.split('\n').map(wire => wire.split(','));

  const grid = generateGrid(wires);

  const collisionsWithoutSelf = Object.values(grid)
    .map((wires) => uniqBy(wires, wire => wire.wire))
    .filter((wires) => wires.length > 1);

  const stepsTaken = collisionsWithoutSelf.map((wires) => {
    return sum(wires.map(wire => wire.stepsTaken));
  }).sort((a, b) => a - b);

  stepsTaken.splice(stepsTaken.indexOf(0), 1); // Remove the origin intersection.

  return Math.min(...stepsTaken);
}

console.log(day3Part1(inputDay3));