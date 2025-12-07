import { controlState } from "@state";
import type { ProbabilityDistribution } from "@customTypes";
import { combinations } from "@utils";

/**
 * Calculates the full probability distribution P(X=k) for the die roll.
 * Uses conditional probability to account for the reroll rule.
 * TODO handle the 'reroll' recursion better. It works but i dont like this pattern.
 * @param singleDieSuccess - The probability of success on a single die (p).
 * @param isRecursiveCall - Hacky flag to prevent infinite recursion during the reroll calculation.
 */
function calculateDistribution(
  singleDieSuccess: number,
  isRecursiveCall: boolean = false
): ProbabilityDistribution {
  // distrubution setup and initialisation of failure muahaha
  const distribution: ProbabilityDistribution = {};
  const failureProb = 1 - singleDieSuccess;

  // standard Binomial Distribution (P_std(X=k))
  for (let k = 0; k <= controlState.dieCount; k++) {
    const combos = combinations(controlState.dieCount, k);
    distribution[k] =
      combos *
      Math.pow(singleDieSuccess, k) *
      Math.pow(failureProb, controlState.dieCount - k);
  }

  // when rerolling is permitted if all 5 die have equal faces that do not match
  // any target food
  if (
    controlState.advancedOptions.rerollWhenAllEqual &&
    controlState.dieCount === 5 &&
    !isRecursiveCall // Hacky way to stop infinite recursion
  ) {
    // count faces where ALL food items are NOT selected targets
    const nonTargetFacesCount = controlState.die.faces.filter((face) => {
      const foods = Array.isArray(face) ? face : [face];
      return foods.every((f) => !controlState.selectedFoods.has(f));
    }).length;

    // P(Reroll Triggered) is the chance of all 5 dice showing the same non-target face
    const probRerollTrigger =
      nonTargetFacesCount *
      Math.pow(1 / controlState.die.faces.length, controlState.dieCount);

    // P(Distribution after Reroll) - Standard distribution after the reroll event
    // using the hacky isRecursive annoyance here, it works but i still dont like it
    const rerollDistribution = calculateDistribution(singleDieSuccess, true);

    // Mass Transfer of Probability after Rerolling (P)
    const P_reroll = probRerollTrigger;

    for (let k = 0; k <= controlState.dieCount; k++) {
      let probXk_MassFromInitialRoll: number;

      // starts getting a bit academic here; had to rely on proofs from statistics nonce's god bless em
      if (k === 0) {
        // Case k=0: P_std(X=0) includes the reroll trigger.
        // The mass of the "No Reroll Trigger" event for k=0 is P_std(X=0) - P_reroll.
        probXk_MassFromInitialRoll = distribution[0] - P_reroll;
      } else {
        // Case k > 0: These outcomes never trigger the reroll.
        // The mass is simply P_std(X=k).
        probXk_MassFromInitialRoll = distribution[k];
      }

      // P(X=k | Reroll) * P(Reroll): The mass contributed by the reroll event
      const probXk_MassFromReroll = rerollDistribution[k] * P_reroll;

      // Final P(X=k) = (Mass from non-reroll failures) + (Mass from successful rerolls)
      distribution[k] = probXk_MassFromInitialRoll + probXk_MassFromReroll;
    }
  }

  return distribution;
}

export function probabilityOfSuccess(): ProbabilityDistribution {
  if (controlState.dieCount === 0 || controlState.selectedFoods.size === 0) {
    return { 0: 1.0 }; // base: 100% chance of 0 successes woohoo exit early
  }

  // single die, used for building the probability distribution, no rerolls needed for this die roll (mass = 1)
  const matchingFaces = controlState.die.faces.filter((face) => {
    const foods = Array.isArray(face) ? face : [face];
    return foods.some((f) => controlState.selectedFoods.has(f));
  }).length;

  const singleDieSuccess = matchingFaces / controlState.die.faces.length;

  // full distribution
  const distribution = calculateDistribution(singleDieSuccess);

  return distribution;
}
