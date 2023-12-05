import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

type Mapping = {
  destStart: number;
  sourceStart: number;
  rangeLength: number;
}

function numberLiesWithinMapping(num: number, { destStart, sourceStart, rangeLength }: Mapping): boolean {
  return num >= sourceStart && num < sourceStart + rangeLength
}

function getMapping(num: number, { destStart, sourceStart, rangeLength }: Mapping): number {
  return destStart + (num - sourceStart);
}

function parseAlmanac(input: string[]) {
  let almanac: Mapping[][] = [];
  let currentMappings: Mapping[] = [];
  for (const line of input) {
    if (line.length === 0) {
      almanac.push(currentMappings);
      currentMappings = [];
      continue;
    }
    const nums = line.match(/\d+/g)?.map(Number);
    if (!nums || nums.length === 0) continue;
    currentMappings.push({ destStart: nums[0], sourceStart: nums[1], rangeLength: nums[2] });
  }
  return almanac;
}

function runMappingForSeed(seed: number, almanac: Mapping[][]): number {
  return almanac.reduce((acc, mappings) => {
    const mapping = mappings.find((mapping) => numberLiesWithinMapping(acc, mapping))
    if (!mapping) return acc;
    return getMapping(acc, mapping)
  }, seed);
}

const first = function (input: string[]) {
  const seeds = input[0].match(/\d+/g)!.map(Number);
  const almanac: Mapping[][] = parseAlmanac(input.slice(2));

  return Math.min(...seeds.map((seed) => runMappingForSeed(seed, almanac)));
};

const second = function (input: string[]) {
  const seedPairs = input[0].match(/\d+/g)!.map(Number);
  const almanac: Mapping[][] = parseAlmanac(input.slice(2));

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < seedPairs.length; i += 2) {
    const start = seedPairs[i];
    const length = seedPairs[i + 1];
    for (let j = 0; j < length; j++) {
      let seed = start + j;
      min = Math.min(runMappingForSeed(seed, almanac), min);
    }
  }

  return min;
};

console.log(first(input));
console.log(second(input));