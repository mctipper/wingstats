import type { Food, ControlState, AdvancedOptionsState } from "@customTypes";
import { baseDie } from "@customTypes";

export const advancedOptionsState: AdvancedOptionsState = {
  numberOfRolls: 1,
  withholdSuccess: false,
  rerollWhenAllEqual: true,
  countAllFoodOnFaces: false,
  countMultipleSuccesses: false,
};

export const controlState: ControlState = {
  selectedBird: "",
  die: baseDie,
  dieCount: 3,
  selectedFoods: new Set<Food>(),
  availableFoods: new Set<Food>(),
  advancedOptions: advancedOptionsState,
};
