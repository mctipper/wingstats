import type { DiceActivationResult } from "@customTypes";
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults";

export function renderRollDiceNotInBirdfeederResult(layoutCategory: string, layoutId: string, result: DiceActivationResult): HTMLElement {
  const layout = renderPrimaryLayout(layoutCategory, layoutId, result);

  renderBirdResultSection(result, {
    includeResultTable: true,
    includeDistributionTable: true,
    includeConditionColumn: true,
    conditionLabel: "Condition",
    getConditionText: activationIndex =>
      `<strong><i>${activationIndex}</i></strong> ${Number(activationIndex) === 1 ? "die" : "dice"}`
  });

  return layout;
}
