import { controlState } from "@state";
import { allFoods } from "@customTypes";
import { type Food } from "@customTypes";
import { probabilityOfSuccess } from "@game";
import { capitaliseFirstLetter } from "@utils";

export function updateResults(): void {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) {
    throw new Error("results container not found in DOM");
  }

  // clear previous children so we don't keep appending
  resultsDiv.innerHTML = "";

  // derive ordered array from the Set, just for display purposes
  const orderedFoods: Food[] = allFoods.filter((food) =>
    controlState.selectedFoods.has(food)
  );

  // inputDiv: shows dice count + selected foods
  const inputDiv = document.createElement("div");
  inputDiv.textContent = `Die: ${capitaliseFirstLetter(
    controlState.die.dieType
  )}, Dice: ${controlState.dieCount}, Foods: ${
    orderedFoods.join(", ") || "none"
  }`;

  // outputDiv: shows probability of success - how the will end up looking is a big fat TODO
  const outputDiv = document.createElement("div");
  outputDiv.textContent = `Probability: ${probabilityOfSuccess(
    controlState.die,
    controlState.dieCount,
    orderedFoods,
    controlState.advancedOptions.rerollWhenAllEqual
  )}`;

  resultsDiv.appendChild(inputDiv);
  resultsDiv.appendChild(outputDiv);
}
