import type { DiceActivationResult } from "@customTypes";
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults";

export function renderMaskedLapwing(layoutId: string, result: DiceActivationResult): HTMLElement {
    const layout = renderPrimaryLayout(layoutId, result);

    renderBirdResultSection(result, {
        includeResultTable: false,
        includeDistributionTable: true,
        includeConditionColumn: true,
        conditionLabel: "Condition",
        getConditionText: activationIndex =>
            `<strong><i>${activationIndex}</i></strong>`
    });

    return layout;
}
