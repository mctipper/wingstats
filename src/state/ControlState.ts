import type { Food } from "@customTypes";

export const controlState = {
    selectedBird: "",
    dieCount: 3,
    selectedFoods: new Set<Food>(),
};
