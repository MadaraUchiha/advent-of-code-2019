import { inputDay6 } from './input';
import { sumBy } from 'lodash';

const CENTER_OF_THE_UNIVSERSE = 'COM';

interface MapEntry {
  orbits: string;
  distance: number;
}

interface OrbitMap {
  [orbiter: string]: MapEntry;
}

function day6Part1(input: string) {
  const orbits = input
    .split('\n')
    .map(orbitRelationship => orbitRelationship.split(')') as [string, string]);

  const orbitMap: OrbitMap = {};

  for (const [orbited, orbiter] of orbits) {
    orbitMap[orbiter] = { orbits: orbited, distance: 0 };
  }

  for (const [orbiter, entry] of Object.entries(orbitMap)) {
    entry.distance = calculateDistance(
      orbiter,
      CENTER_OF_THE_UNIVSERSE,
      orbitMap,
    );
  }

  return sumBy(Object.values(orbitMap), 'distance');
}

function calculateDistance(
  from: string,
  to: string,
  map: OrbitMap,
  total = 0,
): number {
  if (from === to) {
    return total;
  }
  return calculateDistance(map[from].orbits, to, map, total + 1);
}

console.log(day6Part1(inputDay6));
