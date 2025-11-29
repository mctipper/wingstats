import { controlState } from "@state";
import { allFoods } from "@customTypes";
import { type Food } from "@customTypes";

export function updateResults(): void {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) {
    throw new Error("results container not found in DOM");
  }

  // derive ordered array from the Set, just for display purposes
  const orderedFoods: Food[] = allFoods.filter((food) =>
    controlState.selectedFoods.has(food)
  );

  resultsDiv.textContent = `Dice: ${controlState.dieCount}, Foods: ${
    orderedFoods.join(", ") || "none"
  }`;
}
