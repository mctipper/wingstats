import type { ExpansionName } from "./ExpansionName";
import type { BirdCard } from "./BirdCard";

export type BirdCardDeck = {
  expansion: ExpansionName;
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

export type AllBirdDecks = {
  BaseGame: BaseGameDeck;
  European: EuropeanDeck;
  Oceania: OceaniaDeck;
  Asia: AsiaDeck;
};
