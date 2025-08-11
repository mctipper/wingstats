import type {
  HabitatInfo,
  FoodCost,
  Expansions,
  Nest,
  Colour,
  BonusCardInfo,
  BeakPointingInfo
} from "@customTypes";

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
  nestType: Nest;
  eggCapacity: number;
  wingspan: number;
  habitats: HabitatInfo;
  foodCost: FoodCost;
  bonusCards: BonusCardInfo;
  beakPointing: BeakPointingInfo;
  note: string;
  rulings: any[];
  additionalRulings: {
    text: string;
    source: string;
  }[];
};
