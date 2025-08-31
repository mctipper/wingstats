import type { DiceActivationResult } from "@customTypes";
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults";


export function renderRollDiceForXBirdsInHabitat(layoutCategory: string, layoutId: string, result: DiceActivationResult): HTMLElement {
  const includeIndex: boolean = false
  const layout = renderPrimaryLayout(layoutCategory, layoutId, result, includeIndex);

  renderBirdResultSection(result, {
    includeResultTable: true,
    includeDistributionTable: true,
    includeConditionColumn: true,
    conditionLabel: "Condition",
    getConditionText: activationIndex =>
      `<strong><i>${activationIndex}</i></strong> bird${Number(activationIndex) === 1 ? "" : "s"}`
  });

  return layout;
}
