import type { BirdCard } from '../types/BirdCard';
import { transformBirdCard } from '@data/transform/transformBirdCard';
import type {
  BaseGameDeck,
  EuropeanDeck,
  OceaniaDeck,
  AsiaDeck,
  AllBirdDecks
} from '../types/BirdCardDeck';
import type { Expansions } from '../types/Expansions';

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

  const allDecks: AllBirdDecks = {
    BaseGame: baseGameDeck,
    European: europeanDeck,
    Oceania: oceaniaDeck,
    Asia: asiaDeck
  };

  for (const card of transformedCards) {
    allDecks[card.expansion as Expansions].cards.push(card)
  }

  return allDecks;
}
