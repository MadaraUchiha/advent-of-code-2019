import { calculateFuelRequirement } from './common';
import { sum } from 'lodash';
import { inputDay1 } from './input';

export function day1Part2(input: string) {
  const modules = input.split('\n');
  const moduleMasses = modules.map(Number);

  const fuelRequiremens = moduleMasses.map(recursivelyCalculateFuelRequirement);

  return sum(fuelRequiremens);

}

export function recursivelyCalculateFuelRequirement(mass: number) {
  let totalFuel = 0;
  let currentMass = mass;
  while (currentMass = calculateFuelRequirement(currentMass)) {
    if (currentMass <= 0) {
      return totalFuel;
    }
    totalFuel += currentMass;
  }
  return totalFuel;
}

console.log(day1Part2(inputDay1));