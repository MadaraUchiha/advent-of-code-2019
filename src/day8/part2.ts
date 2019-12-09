import { inputDay8 } from './input';
import { chunk } from 'lodash';

export function day8Part2(input: string) {
  const height = 6;
  const width = 25;

  const layers = chunk([...input], height * width);

  const imageBuffer: string[] = [];
  for (let i = 0; i < height * width; i++) {
    imageBuffer.push(pixelAt(layers, i));
  }

  const imagePixels = imageBuffer.map(c => {
    if (c === '0') {
      return '\u2588';
    }
    if (c === '1') {
      return ' ';
    }
    if (c === '2') {
      return 'X';
    }
  });

  const image = chunk(imagePixels, width);

  return image.map(row => row.join('')).join('\n');
}

function pixelAt(layers: string[][], idx: number) {
  for (const layer of layers) {
    if (layer[idx] !== '2') {
      return layer[idx];
    }
  }
  return '2';
}

console.log(day8Part2(inputDay8));
