import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

type Position = { x: number, y: number };

function findAdjacentNumbers(input: string[], x: number, y: number, visited: Position[] = []): number[] {
  return [[(x+1), (y)], [(x-1), (y)], [(x), (y+1)], [(x), (y-1)], [(x+1), (y+1)], [(x+1), (y-1)], [(x-1), (y+1)], [(x-1), (y-1)]]
    .reduce((acc, [x, y]) => {
      if (x < 0 || y < 0 || x >= input[0].length || y >= input.length ||
        visited.find(p => p.x === x && p.y === y) ||
        Number.isNaN(Number(input[y][x]))) return acc;
     
      while (x > 0 && !Number.isNaN(Number(input[y][x-1]))) {
        x--;
      }
      
      const strNum = input[y].slice(x).match(/\d+/g)![0]; 
      Array.from(Array(strNum.length).keys()).forEach(dx => visited.push({ x: x + dx, y }));
      return [...acc, Number(strNum)];
    }, []);
}

const first = function (input: string[]) {
  const visited: Position[] = []
  let sum = 0;
  
  input.forEach((line, y) => {
    [...line].forEach((char, x) => {
      if (!Number.isNaN(Number(char)) || char === '.') return;
      findAdjacentNumbers(input, x, y, visited).forEach(n => sum += n);
    });
  });
  
  return sum;
};

const second = function (input: string[]) {
  let sum = 0;
  
  input.forEach((line, y) => {
    [...line].forEach((char, x) => {
      if (char !== '*') return;

      const adjacent = findAdjacentNumbers(input, x, y);
      if (adjacent.length === 2) {
        sum += adjacent.reduce((a, b) => a * b);
      }
    });
  });
  
  return sum;
};

console.log(first(input));
console.log(second(input));