import { readFileSync } from 'fs';

const input = readFileSync('./input', 'utf8').split('\n');

const cardTypes = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
const cardTypesWithJoker = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] as const;
const handTypes = ['five-of-a-kind', 'four-of-a-kind', 'full-house', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card'] as const;

type Card = typeof cardTypes[number];
type HandType = typeof handTypes[number];
type Hand = {
  cards: Card[]
  bid: number
  handType: HandType
}

function determineType(cards: Card[], joker: boolean = false): HandType { 
  const cardOccurrences = cards.reduce((acc, curr) => (acc[curr] ? ++acc[curr] : acc[curr] = 1, acc), {} as {[key: string]: number});
  const distinctCards = Object.keys(cardOccurrences).sort((a, b) => cardOccurrences[b] - cardOccurrences[a]) as Card[];

  function checkCards(distinctCards: Card[], cardOccurrences: { [key: string]: number }): HandType {
    if (distinctCards.length === 1) return 'five-of-a-kind';
    if (distinctCards.some((key) => cardOccurrences[key] === 4)) return 'four-of-a-kind';
    if (distinctCards.length === 2) return 'full-house';
    if (distinctCards.length === 3 && distinctCards.some((key) => cardOccurrences[key] === 3)) return 'three-of-a-kind';
    if (distinctCards.length === 3) return 'two-pair';
    if (distinctCards.length === 4) return 'one-pair';

    return 'high-card';
  }
    
  if (!joker) return checkCards(distinctCards, cardOccurrences);
  else {
    const normal = checkCards(distinctCards, cardOccurrences);
    return !distinctCards.includes('J') ? normal : [normal, ...distinctCards.filter((c) => 'J').map((type) => {
      return checkCards(distinctCards.filter((c) => c != 'J'), { 
        ...cardOccurrences, 
        [type]: cardOccurrences[type] + cardOccurrences['J'] 
      });
    })].sort((a, b) => handTypes.indexOf(a) - handTypes.indexOf(b))[0];
  }
}

function parseCards(input: string[], joker: boolean = false): Hand[] {
  return input.map((line) => {
    const hand = [...line].slice(0, 5) as Card[];
    return { cards: hand, bid: line.match(/\d+/g)!.map(Number).pop(), handType: determineType(hand, joker) } as Hand;
  });
}

function sortHandUsingCardType(cardTypes: any): (a: Hand, b: Hand) => number {
  return (a: Hand, b: Hand) => {
    if (a.handType != b.handType) return handTypes.indexOf(b.handType) - handTypes.indexOf(a.handType);
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] != b.cards[i]) return cardTypes.indexOf(b.cards[i]) - cardTypes.indexOf(a.cards[i])
    }
    return 0;
  }
}

function solve(input: string[], joker: boolean, sortFn: (a: Hand, b: Hand) => number): number {
  const cards = parseCards(input, joker).sort(sortFn);
  return cards.map((hand, index) => hand.bid * (index + 1)).reduce((acc, curr) => acc + curr, 0);
}

const first = function (input: string[]) {
  return solve(input, false, sortHandUsingCardType(cardTypes));
};

const second = function (input: string[]) {
  return solve(input, true, sortHandUsingCardType(cardTypesWithJoker));
};

console.log(first(input));
console.log(second(input));