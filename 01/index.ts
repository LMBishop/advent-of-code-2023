import { readFileSync } from 'fs';
const input = readFileSync('./input', 'utf8').split('\n');

const first = function (input: string[]) {
  return input.reduce((acc, curr) => {
    const [first, second] = [curr.match(/\d/g)![0], curr.match(/\d/g)!.pop()];
    return acc + Number.parseInt(`${first}${second}`);
  }, 0);
};

const second = function (input: string[]) {
  const strNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  return first(input.map((s) => strNums.reduce((acc, curr, idx) => acc.replaceAll(curr, curr + (idx + 1) + curr), s)));
};

console.log(first(input));
console.log(second(input));