import type { Food, Die } from "@customTypes";

export interface ControlState {
  selectedBird: string;
  die: Die;
  dieCount: number;
  selectedFoods: Set<Food>;
  availableFoods: Set<Food>;
  advancedOptions: AdvancedOptionsState;
}

export interface AdvancedOptionsState {
  numberOfRolls: Number; // number of times to roll the dice
  withholdSuccess: boolean; // withhold successful die before reroll
  rerollWhenAllEqual: boolean; // negate current and reroll if all die faces are equal.
  countAllFoodOnFaces: boolean; // allow counting of all the food on the diefaces as success
  allProbabilitesUpToDieCount: boolean; // return probability of 'multiple success', from 1 up to dieCount
}
