import type { DiceActivationResult } from "@customTypes"
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults"

export function renderRollAnyXDie(layoutId: string, result: DiceActivationResult): HTMLElement {
    const layout = renderPrimaryLayout(layoutId, result);

    renderBirdResultSection(result, {
        includeResultTable: true,
        includeDistributionTable: true,
        includeConditionColumn: false,
    });

    return layout;
}
