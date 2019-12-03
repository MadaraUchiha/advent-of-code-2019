import { inputDay3 } from './input';
import assert from 'assert';

export function day3Part1(input: string) {
  const wires = input.split('\n').map(wire => wire.split(','));

  const grid: { [coords: string]: Set<number> } = {};
  for (const [idx, wire] of wires.entries()) {
    let x = 0;
    let y = 0;
    for (const instruction of wire) {
      const [direction, stepsStr] = splitOnIndex(instruction, 1);
      const steps = Number(stepsStr);
      addWireSegment(grid, idx, x, y);
      for (let i = 0; i < steps; i++) {
        switch (direction) {
          case 'U': y++; break;
          case 'D': y--; break;
          case 'R': x++; break;
          case 'L': x--; break;
        }
        addWireSegment(grid, idx, x, y);
      }
    }

  }

  const collisions = Object.entries(grid).filter(([coords, wires]) => wires.size > 1);
  const distances = collisions.map(([coords]) => {
    const [x, y] = coords.split(',').map(Number);
    return Math.abs(x) + Math.abs(y);
  }).sort((a, b) => a - b);

  distances.splice(distances.indexOf(0), 1); // Remove the origin intersection.

  return Math.min(...distances);
}

function addWireSegment(grid: { [coords: string]: Set<number> }, wire: number, x: number, y: number) {
  grid[`${x},${y}`] = grid[`${x},${y}`] ?? new Set();
  grid[`${x},${y}`].add(wire);
}

function splitOnIndex(str: string, index: number) {
  assert.ok(index < str.length && index >= 0);
  return [str.substring(0, index), str.substring(index)] as const;
}

console.log(day3Part1(inputDay3));