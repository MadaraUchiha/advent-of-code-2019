import { inputDay6 } from './input';
import { OrbitMap, CENTER_OF_THE_UNIVSERSE } from './common';

function day6Part1(input: string) {
  const orbits = input
    .split('\n')
    .map(orbitRelationship => orbitRelationship.split(')') as [string, string]);

  const orbitMap: OrbitMap = {};

  for (const [orbited, orbiter] of orbits) {
    orbitMap[orbiter] = { orbits: orbited };
  }

  const pathYou = calculatePath(
    orbitMap['YOU'].orbits,
    CENTER_OF_THE_UNIVSERSE,
    orbitMap,
  );
  const pathSan = calculatePath(
    orbitMap['SAN'].orbits,
    CENTER_OF_THE_UNIVSERSE,
    orbitMap,
  );

  const difference = pathYou
    .filter(x => !pathSan.includes(x))
    .concat(pathSan.filter(x => !pathYou.includes(x)));

  return difference.length;
}

function calculatePath(from: string, to: string, map: OrbitMap) {
  let current = from;
  const result: string[] = [];
  while (current !== to) {
    result.push(`${current}->${map[current].orbits}`);
    current = map[current].orbits;
    if (current === CENTER_OF_THE_UNIVSERSE && to !== CENTER_OF_THE_UNIVSERSE) {
      throw new Error('Out of bounds. Universe imploding');
    }
  }
  return result;
}

console.log(day6Part1(inputDay6));
