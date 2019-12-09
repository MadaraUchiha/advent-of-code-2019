import { inputDay8 } from './input';
import { chunk, minBy } from 'lodash';

export function day8Part1(input: string) {
  const height = 6;
  const width = 25;

  const layers = chunk([...input], height * width);

  const minimalLayer = minBy(layers, layer => amountOf(layer, '0'));

  if (!minimalLayer) {
    throw new Error('No layers. Universe imploding');
  }

  return amountOf(minimalLayer, '1') * amountOf(minimalLayer, '2');
}

const amountOf = <T>(arr: T[], value: T) =>
  arr.filter(item => item === value).length;

console.log(day8Part1(inputDay8));
