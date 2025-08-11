import type { Expansions } from "./Expansions";
import type { BirdCard } from "./BirdCard";

export type BirdCardDeck = {
  expansion: Expansions;
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
