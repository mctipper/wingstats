import { type Die, type Food } from "@customTypes";

export function probabilityOfSuccess(
  die: Die,
  numDice: number,
  target: Food | Food[],
  rerollWhenAllEqual: boolean
): string {
  const targets = Array.isArray(target) ? target : [target];

  if (numDice === 0 || target.length === 0) {
    // basecase, no dice or no target food somehow
    return formatPercent(0);
  }

  // count matching faces
  const matchingFaces = die.faces.filter((face) => {
    const foods = Array.isArray(face) ? face : [face];
    return foods.some((f) => targets.includes(f));
  }).length;

  const singleDieSuccess = matchingFaces / die.faces.length; // 6 faces

  // normal probability
  let overallSuccess = 1 - Math.pow(1 - singleDieSuccess, numDice);

  // when permitted to reroll when 5 non-target die faces are rolled
  if (numDice === 5 && rerollWhenAllEqual) {
    // count non-target faces
    const nonTargetFaces = die.faces.filter((face) => {
      const foods = Array.isArray(face) ? face : [face];
      return foods.every((f) => !targets.includes(f));
    }).length;

    // probability of all dice showing the same non-target face
    const allEqualNonTarget =
      nonTargetFaces / Math.pow(die.faces.length, numDice);

    // remove this from failure probability
    overallSuccess =
      1 - (Math.pow(1 - singleDieSuccess, numDice) - allEqualNonTarget);
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
