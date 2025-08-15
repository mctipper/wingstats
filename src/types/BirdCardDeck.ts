import type { BirdCard } from "@customTypes";

export type Expansion =
  | 'BaseGame'
  | 'European'
  | 'Oceania'
  | 'Asia';

export type BirdCardDeck = {
  expansion: Expansion;
  cards: BirdCard[];
};

export type BaseGameDeck = BirdCardDeck & {
  expansion: "BaseGame";
};

export type EuropeanDeck = BirdCardDeck & {
  expansion: "European";
};

export type OceaniaDeck = BirdCardDeck & {
  expansion: "Oceania";
};

export type AsiaDeck = BirdCardDeck & {
  expansion: "Asia";
};

export type BirdDeckCollection = {
  BaseGame: BaseGameDeck;
  European: EuropeanDeck;
  Oceania: OceaniaDeck;
  Asia: AsiaDeck;
};
