import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n').filter((s) => !!s);

type Direction = 'L' | 'R'
type Node = { [key in Direction]: string };
type NodeWithName = Node & { name: string }
type NodeList<T> = { [key: string]: T };

function parseNodeList(input: string[]): { directions: Direction[], nodeList: NodeList<NodeWithName> } {
  const directions: Direction[] = [...input[0]] as Direction[];
  const nodeList = input.slice(1).reduce((acc, line) => {
    const strings = line.match(/[A-Z]+/g)!;
    return {
      ...acc,
      [strings[0]]: {
        name: strings[0],
        'L': strings[1],
        'R': strings[2]
      }
    }
  }, {}) as NodeList<NodeWithName>;
  return { directions, nodeList }
}

const first = function (input: string[]) {
  const { directions, nodeList } = parseNodeList(input);

  let currentNode: NodeWithName = nodeList['AAA'];
  let steps = 0;
  for (let i = 0; currentNode.name !== 'ZZZ'; i = (i + 1) % directions.length, ++steps) {
    currentNode = nodeList[currentNode[directions[i]]];
  }
  return steps;
};

const second = function (input: string[]) {
  const { directions, nodeList } = parseNodeList(input);

  const gcd = (a: number, b: number) => {
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

  const startNodes: NodeWithName[] = Object.values(nodeList).filter((node) => node.name.endsWith('A'));
  const stpesForAllNodes = startNodes.map((startNode) => {
    let steps = 0;
    let currentNode = startNode;
    for (let i = 0; !currentNode.name.endsWith('Z'); i = (i + 1) % directions.length, ++steps) {
      currentNode = nodeList[currentNode[directions[i]]];
    }
    return steps;
  });

  return stpesForAllNodes.reduce((acc, curr) => lcm(curr, acc), 1);
};

console.log(first(input));
console.log(second(input));