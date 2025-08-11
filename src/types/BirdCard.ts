import type { HabitatInfo } from "./Habitats";
import type { FoodCost } from "./Food";
import type { Expansions } from "./Expansions";
import type { Colour } from "./Colour";
import type { BonusCards } from "./BonusCards";
import type { BeakPointing } from "./BeakPointing";

export type BirdCard = {
  id: number;
  commonName: string;
  scientificName: string;
  expansion: Expansions;
  color: Colour;
  powerCategory: string | null;
  powerText: string;
  predator: boolean;
  flocking: boolean;
  bonusCard: boolean;
  victoryPoints: number;
  nestType: string;
  eggCapacity: number;
  wingspan: number;
  habitats: HabitatInfo;
  foodCost: FoodCost;
  bonusCards: BonusCards;
  beakPointing: BeakPointing;
  note: string;
  rulings: any[];
  additionalRulings: {
    text: string;
    source: string;
  }[];
};
