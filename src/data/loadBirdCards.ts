import type { BirdCard } from '../types/BirdCard';
import { transformBirdCard } from './transformBirdCards';
import type {
  BaseGameDeck,
  EuropeanDeck,
  OceaniaDeck,
  AsiaDeck,
  AllBirdDecks
} from '../types/BirdCardDeck';

export async function loadBirdCards(): Promise<AllBirdDecks> {
  const response = await fetch(`${import.meta.env.BASE_URL}/data/master.json`);

  if (!response.ok) {
    throw new Error('Failed to load master.json data');
  }

  const rawCards: Record<string, any>[] = await response.json();
  const transformedCards: BirdCard[] = rawCards.map(transformBirdCard);

  const baseGameDeck: BaseGameDeck = {
    expansion: "BaseGame",
    cards: []
  };

  const europeanDeck: EuropeanDeck = {
    expansion: "European",
    cards: []
  };

  const oceaniaDeck: OceaniaDeck = {
    expansion: "Oceania",
    cards: []
  };

  const asiaDeck: AsiaDeck = {
    expansion: "Asia",
    cards: []
  };

  for (const card of transformedCards) {
    switch (card.expansion) {
      case "originalcore":
      case "swiftstart":
        baseGameDeck.cards.push(card);
        break;
      case "european":
        europeanDeck.cards.push(card);
        break;
      case "oceania":
        oceaniaDeck.cards.push(card);
        break;
      case "asia":
        asiaDeck.cards.push(card);
        break;
      default:
        console.warn(`Unexpected expansion value: ${card.expansion}`);
    }
  }

  const allDecks: AllBirdDecks = {
    BaseGame: baseGameDeck,
    European: europeanDeck,
    Oceania: oceaniaDeck,
    Asia: asiaDeck
  };

  return allDecks;
}
