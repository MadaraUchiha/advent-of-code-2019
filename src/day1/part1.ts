import { inputDay1 } from './input';
import { sum } from 'lodash';
import { calculateFuelRequirement } from './common';

export function day1Part1(input: string) {
  const modules = input.split('\n');
  const moduleMasses = modules.map(Number);

  const fuelRequiremens = moduleMasses.map(calculateFuelRequirement);

  return sum(fuelRequiremens);
}

console.log(day1Part1(inputDay1));