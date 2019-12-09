export const CENTER_OF_THE_UNIVSERSE = 'COM';

export interface MapEntry {
  orbits: string;
  distance?: number;
}

export interface OrbitMap {
  [orbiter: string]: MapEntry;
}
