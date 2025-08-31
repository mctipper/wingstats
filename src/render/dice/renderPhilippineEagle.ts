import type { DiceActivationResult } from "@customTypes";
import { renderPrimaryLayout } from "@render/primaryRender";
import { renderBirdResultSection } from "@render/helpers/renderResults";

export function renderPhilippineEagle(layoutId: string, result: DiceActivationResult): HTMLElement {
    const includeIndex: boolean = false
    const layout = renderPrimaryLayout(layoutId, result, includeIndex);

    renderBirdResultSection(result, {
        includeResultTable: true,
        includeDistributionTable: true,
        includeConditionColumn: false
    });

    return layout;
}
