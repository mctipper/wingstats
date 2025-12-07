import { controlState } from "@state";
import { allFoods } from "@customTypes";
import { probabilityOfSuccess } from "@game";
import { capitaliseFirstLetter } from "@utils";

const getControlStateSummary = () => {
  const lines = [];

  // selected bird (if any)
  if (controlState.selectedBird) {
    lines.push(`For Bird: ${controlState.selectedBird}`);
  }

  // human wordage for number of rolls
  let rollCountText: string;
  switch (controlState.advancedOptions.numberOfRolls) {
    case 1:
      rollCountText = "just once";
      break;
    case 2:
      rollCountText = "twice";
      break;
    case 3:
      rollCountText = "thrice";
      break;
    default:
      // Use the default numeric phrase for 4+ rolls
      rollCountText = `${controlState.advancedOptions.numberOfRolls} times`;
      break;
  }

  // putting dice details together
  if (controlState.dieCount > 0) {
    lines.push(
      `Rolling ${controlState.dieCount} ${capitaliseFirstLetter(
        controlState.die.dieType
      )} Di${controlState.dieCount > 1 ? "c" : ""}e ${rollCountText}`
    );
  }

  // target food detail, with human wordage again
  const capitalisedOrderedFoods: string[] = allFoods
    .filter((food) => controlState.selectedFoods.has(food))
    .map(capitaliseFirstLetter);

  if (capitalisedOrderedFoods.length > 0) {
    let targetString: string;
    const numTargets = capitalisedOrderedFoods.length;

    if (numTargets === 1) {
      targetString = capitalisedOrderedFoods[0];
    } else if (numTargets === 2) {
      targetString = capitalisedOrderedFoods.join(" and ");
    } else {
      // grammatically correct for > 2
      const lastFood = capitalisedOrderedFoods[numTargets - 1];
      const restOfFoods = capitalisedOrderedFoods.slice(0, numTargets - 1);

      // yes its an oxford comma A+ 10/10
      targetString = `${restOfFoods.join(", ")}, and ${lastFood}`;
    }

    lines.push(`Targeting: ${targetString}`);
  } else {
    lines.push("No Food Target(s) Selected");
  }

  // highlight that no re-roll when all 5 die rolled with equal faces
  if (
    controlState.dieCount === 5 &&
    !controlState.advancedOptions.rerollWhenAllEqual
  ) {
    lines.push(`No 'reroll' permitted when all 5 faces are equal`);
  }

  // placeholders for now - other options
  if (controlState.advancedOptions.withholdSuccess) {
    lines.push("Withhold Successes: Enabled");
  }

  if (controlState.advancedOptions.countAllFoodOnFaces) {
    lines.push("Count All Food on Faces: Enabled");
  }

  if (controlState.advancedOptions.allProbabilitesUpToDieCount) {
    lines.push("Probabilities Up To Die Count: Enabled");
  }

  return lines.join("\n");
};

export function updateResults(): void {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) {
    throw new Error("results container not found in DOM");
  }

  // clear previous children so we don't keep appending
  resultsDiv.innerHTML = "";

  // inputDiv: shows input options
  const inputDiv = document.createElement("pre");

  inputDiv.textContent = getControlStateSummary();

  // outputDiv: shows probability of success - how the will end up looking is a big fat TODO
  const outputDiv = document.createElement("div");
  outputDiv.className = "probability-div";
  outputDiv.textContent = `Probability: ${probabilityOfSuccess(
    controlState.die,
    controlState.dieCount,
    controlState.selectedFoods,
    controlState.advancedOptions.rerollWhenAllEqual
  )}`;

  resultsDiv.appendChild(inputDiv);
  resultsDiv.appendChild(outputDiv);
}
