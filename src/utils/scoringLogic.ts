// scoringLogic.ts

// Define a type for a card to ensure consistency across the application
type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface Card {
  rank: Rank;
  suit: Suit;
}

// Define a type for a hand, which is an array of cards, plus the starter card
interface Hand {
  cards: Card[];
  starter: Card;
}

// Convert Rank to numerical value for scoring
const rankToPoints = (rank: Rank): number => {
  switch (rank) {
    case 'A':
      return 1;
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
      return parseInt(rank);
    case 'J':
    case 'Q':
    case 'K':
      return 10;
    default:
      throw new Error(`Unknown rank: ${rank}`);
  }
};

// Helper function to generate all combinations of cards
function* combinations<T>(array: T[], length: number, startIndex = 0, currentCombination: T[] = []): Generator<T[]> {
  if (length === 0) {
    yield currentCombination;
    return;
  }
  for (let i = startIndex; i <= array.length - length; i++) {
    yield* combinations(array, length - 1, i + 1, [...currentCombination, array[i]]);
  }
}

// Calculate score from combinations summing to fifteen
const scoreFifteens = ({ cards, starter }: Hand): number => {
  let count = 0;
  const allCards = [...cards, starter];
  for (let i = 2; i <= allCards.length; i++) {
    for (const combo of combinations(allCards, i)) {
      const sum = combo.reduce((acc, card) => acc + rankToPoints(card.rank), 0);
      if (sum === 15) {
        count += 2;
      }
    }
  }
  return count;
};

// Calculate score from pairs, three of a kind, and four of a kind
const scorePairs = ({ cards, starter }: Hand): number => {
  let count = 0;
  const allCards = [...cards, starter];
  const seen: Record<string, number> = {};
  allCards.forEach(card => {
    seen[card.rank] = (seen[card.rank] || 0) + 1;
  });
  Object.values(seen).forEach(value => {
    if (value >= 2) {
      count += value * (value - 1); // n * (n-1) for pairs, accounting for multiples
    }
  });
  return count;
};

// Calculate score from runs of three or more consecutive cards
const scoreRuns = ({ cards, starter }: Hand): number => {
  let totalScore = 0;
  const allCards = [...cards, starter].map(card => rankToPoints(card.rank));
  allCards.sort((a, b) => a - b);

  for (let start = 0; start < allCards.length; ++start) {
    for (let end = start + 2; end < allCards.length; ++end) {
      if (allCards[end] - allCards[start] === end - start) {
        // Found a run
        let runLength = end - start + 1;
        let runScore = 1;

        // Count duplicates to handle runs with pairs, three of a kind, etc.
        let duplicatesCount = {};
        for (let i = start; i <= end; ++i) {
          duplicatesCount[allCards[i]] = (duplicatesCount[allCards[i]] || 0) + 1;
        }

        // Calculate run score considering duplicates
        runScore = Object.values(duplicatesCount).reduce((acc, count) => acc * count, runScore);

        // Update total score
        totalScore += runScore * runLength;
        break; // Break after counting a run to avoid double counting
      }
    }
  }

  return totalScore;
};


// Calculate score from flushes in the hand and/or the crib
const scoreFlush = ({ cards, starter }: Hand, isCrib: boolean): number => {
  if (cards.every(card => card.suit === cards[0].suit)) {
    return isCrib && starter.suit !== cards[0].suit ? 0 : cards.length + (starter.suit === cards[0].suit ? 1 : 0);
  }
  return 0;
};

// Calculate score for having the jack of the same suit as the starter card (Nobs)
const scoreNobs = ({ cards, starter }: Hand): number => {
  return cards.some(card => card.rank === 'J' && card.suit === starter.suit) ? 1 : 0;
};

export const calculateHandScore = (hand: Hand, isCrib: boolean = false): number => {
  return scoreFifteens(hand) + scorePairs(hand) + scoreRuns(hand) + scoreFlush(hand, isCrib) + scoreNobs(hand);
};
