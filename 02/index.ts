import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

const first = function (input: string[]) {
  return input.reduce((acc, curr) => {
    const game = curr.split(':')[0].match(/\d+/g)![0];
    const draws = curr.split(':')[1].split(';');
    const max = { red: 12, green: 13, blue: 14 }
    if (draws.every(draw => {
      const cubes = draw.split(',');
      return cubes.every(cube => {
        const count = Number(cube.match(/\d+/g));
        const colour = cube.match(/(red|green|blue)/g)![0];
        return count <= max[colour];
      });
    })) {
      return acc + Number(game)
    } else {
      return acc;
    }
  }, 0);
};

const second = function (input: string[]) {
  return input.reduce((acc, curr) => {
    const draws = curr.split(':')[1].split(';');
    const allCubes: { red: number[], green: number[], blue: number[] } = { red: [], green: [], blue: [] }
    draws.forEach(draw => {
      const cubes = draw.split(',');
      cubes.forEach(cube => {
        const count = Number(cube.match(/\d+/g));
        const colour = cube.match(/(red|green|blue)/g)![0];
        allCubes[colour].push(count);
      });        
    });
    return acc + (Math.max(...allCubes.red, 1)) * (Math.max(...allCubes.green, 1)) * (Math.max(...allCubes.blue, 1));
  }, 0);
};

console.log(first(input));
console.log(second(input));