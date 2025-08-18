import type { Expansion } from "@customTypes";

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

export type FoodInfo = {
  [F in Food]: boolean;
} & {
  foodCost: FoodCost
} & {
  foodDetail: FoodDetail;
};

export type FoodCost = {
  invertebrate: number,
  seed: number,
  fish: number,
  fruit: number,
  rodent: number,
  nectar: number,
  wildFood: number,
  totalFoodCost: number
}

export type FoodDetail = {
  slashFoodCost: boolean,
  starFoodCost: boolean
}

export type Habitat =
  | 'Forest'
  | 'Grassland'
  | 'Wetland';

export type HabitatInfo = {
  [H in Habitat]: boolean
} & {
  habitatCount: number;
  multipleHabitats: boolean;
}

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
  expansion: Expansion;
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
  food: FoodInfo
  bonusCards: BonusCardInfo;
  beakPointing: BeakPointingInfo;
  note: string;
  rulings: any[];
  additionalRulings: {
    text: string;
    source: string;
  }[];
};
