export function calculateFuelRequirement(moduleMass: number) {
  return Math.floor(moduleMass / 3) - 2;
}
