import type { DiceActivationResult } from "@customTypes";
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults";


export function renderPushYourLuck(layoutCategory: string, layoutId: string, result: DiceActivationResult): HTMLElement {
  const layout = renderPrimaryLayout(layoutCategory, layoutId, result);

  renderBirdResultSection(result, {
    includeResultTable: true,
    includeDistributionTable: true,
    includeConditionColumn: true,
    conditionLabel: "Condition",
    getConditionText: activationIndex =>
      `Stop after <strong><i>${activationIndex}</i></strong> roll`
  });

  return layout;
}
