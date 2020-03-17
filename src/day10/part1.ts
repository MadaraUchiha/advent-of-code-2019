import { inputDay10 } from './input';
import { uniq, maxBy, sortBy } from 'lodash';

export function day10Part1(input: string) {
  const asteroids = input
    .split('\n')
    .flatMap((row, y) => row.split('').map((point, x) => ({ point, x, y })))
    .filter(({ point }) => point === '#');

  const visibility = asteroids.map(asteroid => ({
    asteroid,
    visible: uniq(
      asteroids
        .map(otherAsteroid =>
          calculateProjection(
            asteroid.x,
            asteroid.y,
            otherAsteroid.x,
            otherAsteroid.y,
          ),
        )
        .map(p => JSON.stringify(p)),
    ).length,
  }));

  // const mostVisibleAsteroid = sortBy(visibility, 'visible').reverse()[0];
  const mostVisibleAsteroid = maxBy(visibility, 'visible');

  return JSON.stringify(mostVisibleAsteroid);
}

function calculateProjection(
  originX: number,
  originY: number,
  targetX: number,
  targetY: number,
) {
  const mean = (originY - targetY) / (originX - targetX);
  const direction =
    originX === targetX
      ? originY < targetY
        ? 'positive'
        : 'negative'
      : originX < targetX
      ? 'positive'
      : 'negative';

  return { mean, direction };
}

console.log(day10Part1(inputDay10));
