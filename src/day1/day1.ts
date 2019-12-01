import { inputDay1 } from './input';
import { sum } from 'lodash';

export function day1Part1(input: string) {
  const modules = input.split('\n');
  const moduleMasses = modules.map(Number);

  const fuelRequiremens = moduleMasses.map(calculateFuelRequirement);

  console.log(fuelRequiremens);

  return sum(fuelRequiremens);
}

export function calculateFuelRequirement(moduleMass: number) {
  return Math.floor(moduleMass / 3) - 2;
}

console.log(day1Part1(inputDay1));