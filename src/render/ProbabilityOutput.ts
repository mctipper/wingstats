import type { ProbabilityDistribution } from "@customTypes";
import { probabilityOfSuccess } from "@game";
import { controlState } from "@state";
import { formatProbability } from "@utils";

export function renderProbabilityOutput(): HTMLElement {
  const outputDiv = document.createElement("div");
  outputDiv.className = "probability-div";
  const PAD_LENGTH = 40;

  const distribution: ProbabilityDistribution = probabilityOfSuccess();

  const lines: string[] = [];

  // sort from failure (0) to big success (n)
  const successes = Object.keys(distribution)
    .map(Number)
    .sort((a, b) => a - b);

  // overall chance of any success
  const probAtLeastOne = successes
    .filter((k) => k >= 1)
    .reduce((sum, k) => sum + distribution[k], 0);

  if (probAtLeastOne > 0) {
    lines.push(`(P ≥ 1 success): ${formatProbability(probAtLeastOne)}`);
    lines.push(`---`); // separator
  }

  // when counting all success counts
  if (controlState.advancedOptions.countMultipleSuccesses) {
    for (const k of successes) {
      const probability = distribution[k];
      const formattedProb = formatProbability(probability);

      const successText = k === 1 ? "success" : "successes";
      const description = `P(exactly ${k} ${successText}):`;
      const paddedDescription = description.padEnd(PAD_LENGTH, " ");
      lines.push(`${paddedDescription}${formattedProb}`);
    }
  }

  console.log(lines);

  outputDiv.innerHTML = lines.join("\n");
  outputDiv.style.whiteSpace = "pre-wrap"; // respect newline you cheeky bugger

  return outputDiv;
}
