import { transformBirdCard } from '@data/transform/transformBirdCard';
import type {
  BirdCard,
  Expansion,
  BaseGameDeck,
  EuropeanDeck,
  OceaniaDeck,
  AsiaDeck,
  BirdDeckCollection
} from '@customTypes';


export async function loadBirdCards(): Promise<BirdDeckCollection> {
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

  const allDecks: BirdDeckCollection = {
    BaseGame: baseGameDeck,
    European: europeanDeck,
    Oceania: oceaniaDeck,
    Asia: asiaDeck
  };

  for (const card of transformedCards) {
    allDecks[card.expansion as Expansion].cards.push(card)
  }

  return allDecks;
}
