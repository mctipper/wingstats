import type { Expansions } from "@customTypes";

export type BeakPointing = {
  left: boolean;
  right: boolean;
}

export type BeakPointingInfo = BeakPointing & {
  both: boolean;
  neither: boolean;
}

export type BonusCards = {
  anatomist: boolean;
  cartographer: boolean;
  historian: boolean;
  photographer: boolean;
  backyardBirder: boolean;
  birdBander: boolean;
  birdCounter: boolean;
  birdFeeder: boolean;
  dietSpecialist: boolean;
  enclosureBuilder: boolean;
  falconer: boolean;
  fisheryManager: boolean;
  foodWebExpert: boolean;
  forester: boolean;
  largeBirdSpecialist: boolean;
  nestBoxBuilder: boolean;
  omnivoreExpert: boolean;
  passerineSpecialist: boolean;
  platformBuilder: boolean;
  prairieManager: boolean;
  rodentologist: boolean;
  viticulturalist: boolean;
  wetlandScientist: boolean;
  wildlifeGardener: boolean;
  caprimulgiformSpecialist: boolean;
  smallClutchSpecialist: boolean;
  endangeredSpeciesProtector: boolean;
}

export type BonusCardInfo = BonusCards & {
  bonusCardCount: number
}

export type Colour =
  | 'None'
  | 'White'
  | 'Brown'
  | 'Pink'
  | 'Teal'
  | 'Yellow';

export type Food =
  | 'Invertebrate'
  | 'Seed'
  | 'Fish'
  | 'Fruit'
  | 'Rodent'
  | 'Nectar';


export type FoodCost = {
  invertebrate: number,
  seed: number,
  fish: number,
  fruit: number,
  rodent: number,
  nectar: number,
  wildFood: number,
  slashFoodCost: boolean,
  starFoodCost: boolean,
  totalFoodCost: number
}

export type Habitats = {
  forest: boolean;
  grassland: boolean;
  wetland: boolean;
};

export type HabitatInfo = Habitats & {
  habitatCount: number;
  multipleHabitats: boolean;
};

export type Nest =
  | 'None'
  | 'Cavity'
  | 'Platform'
  | 'Ground'
  | 'Bowl'
  | 'Star';


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
