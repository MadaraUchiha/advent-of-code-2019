import assert from 'assert';

export function generateGrid(wires: string[][]) {
  const grid: { [coords: string]: { wire: number, stepsTaken: number }[] } = {};
  for (const [idx, wire] of wires.entries()) {
    let x = 0;
    let y = 0;
    let stepsTaken = 0;
    for (const instruction of wire) {
      const [direction, stepsStr] = splitOnIndex(instruction, 1);
      const steps = Number(stepsStr);
      addWireSegment(grid, idx, x, y, stepsTaken);
      for (let i = 0; i < steps; i++) {
        switch (direction) {
          case 'U': y++; break;
          case 'D': y--; break;
          case 'R': x++; break;
          case 'L': x--; break;
        }
        stepsTaken++;
        addWireSegment(grid, idx, x, y, stepsTaken);
      }
    }

  }

  return grid;
}

function addWireSegment(
  grid: { [coords: string]: { wire: number, stepsTaken: number }[] },
  wire: number,
  x: number,
  y: number,
  stepsTaken: number
) {
  grid[`${x},${y}`] = grid[`${x},${y}`] ?? [];
  grid[`${x},${y}`].push({ wire, stepsTaken });
}

function splitOnIndex(str: string, index: number) {
  assert.ok(index < str.length && index >= 0);
  return [str.substring(0, index), str.substring(index)] as const;
}
