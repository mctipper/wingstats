import { controlState } from "@state";

export function probabilityOfSuccess(): string {
  if (controlState.dieCount === 0 || controlState.selectedFoods.size === 0) {
    // basecase, no dice or no controlState.selectedFoods food somehow
    return formatPercent(0);
  }

  // count matching faces
  const matchingFaces = controlState.die.faces.filter((face) => {
    const foods = Array.isArray(face) ? face : [face];
    return foods.some((f) => controlState.selectedFoods.has(f));
  }).length;

  const singleDieSuccess = matchingFaces / controlState.die.faces.length; // 6 faces

  // normal probability
  let overallSuccess =
    1 - Math.pow(1 - singleDieSuccess, controlState.dieCount);

  // when permitted to reroll when 5 non-controlState.selectedFoods die faces are rolled
  if (
    controlState.dieCount === 5 &&
    controlState.advancedOptions.rerollWhenAllEqual
  ) {
    // count non-controlState.selectedFoods faces
    const nonTargetFaces = controlState.die.faces.filter((face) => {
      const foods = Array.isArray(face) ? face : [face];
      return foods.every((f) => !controlState.selectedFoods.has(f));
    }).length;

    // probability of all dice showing the same non-controlState.selectedFoods face
    const allEqualNonTarget =
      nonTargetFaces /
      Math.pow(controlState.die.faces.length, controlState.dieCount);

    // remove this from failure probability
    overallSuccess =
      1 -
      (Math.pow(1 - singleDieSuccess, controlState.dieCount) -
        allEqualNonTarget);
  }

  return formatPercent(overallSuccess);
}

function formatPercent(prob: number): string {
  const percent = prob * 100;

  if (percent === 0) return "0%";

  // >= 0.1%: show two decimal places
  if (percent >= 0.1) {
    return `${percent.toFixed(2)}%`;
  }

  // keep increasing decimals until significant (non-zero) digit be found
  let decimals = 3;
  let formatted = percent.toFixed(decimals);

  while (parseFloat(formatted) === 0 && decimals < 20) {
    decimals++;
    formatted = percent.toFixed(decimals);
  }

  return `${formatted}%`;
}
