import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

function parseInput(input: string[]): number[][] {
  const distances = input[1].match(/\d+/g)!.map(Number);
  return input[0].match(/\d+/g)!.map(Number).map((e, i) => [e, distances[i]]);
}

const first = function (input: string[]) {
  return parseInput(input).reduce((acc, [time, distance]) => {
    return acc * [...Array(time).keys()].filter((speed) => (speed * (time - speed)) > distance).length;
  }, 1);
};

const second = function (input: string[]) {
  return first(input.map((line) => `${line.match(/\d+/g)!.join('')}`));
};

console.log(first(input));
console.log(second(input));