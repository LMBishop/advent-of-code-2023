import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

type Card = {
  id: number,
  winning: number[],
  numbers: number[]
};

type CardWithCopies = Card & {
  copies: number
};

function parseCards(input: string[]): Card[] {
  return input.map((line) => {
    const allNumbers = line.match(/\d+/g);
    const id = Number(allNumbers![0]);
    const winning = allNumbers!.slice(1, 11).map(Number);
    const numbers = allNumbers!.slice(11).map(Number);
    return { id, winning, numbers };
  });
}

const first = function (input: string[]) {
  return parseCards(input).reduce((acc, { id, numbers, winning }) => {
    return acc + Math.floor(2 ** (numbers.filter(n => winning.includes(n)).length - 1));
  }, 0);
};

const second = function (input: string[]) {
  const cards: CardWithCopies[] = parseCards(input).map(card => ({ ...card, copies: 1 }));

  function* nextCard() {
    for (const card of cards) {
      let count = 0;
      while (++count <= card.copies) yield card;
    }
  }
  const cardGenerator = nextCard();

  for (const { id, numbers, winning } of cardGenerator) {
    const numWin = numbers.filter(n => winning.includes(n)).length;
    if (numWin === 0) continue;
    [...Array(numWin).keys()].forEach(i => {
      cards[id + i].copies++;
    });
  }

  return cards.reduce((acc, curr) => acc += curr.copies, 0);
};

console.log(first(input));
console.log(second(input));