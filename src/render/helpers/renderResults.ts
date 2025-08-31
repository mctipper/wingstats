import type { DiceActivationResult } from "@customTypes";
import { idFriendlyBirdname } from "@render/helpers/idFriendlyBirdName";

type ResultTableConfig = {
    includeResultTable: boolean,
    includeDistributionTable: boolean,
    includeConditionColumn?: boolean;
    conditionLabel?: string;
    getConditionText?: (activationIndex: string) => string;
};

function renderResultTable(result: DiceActivationResult, config: ResultTableConfig): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "result-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    if (config.includeConditionColumn) {
        const th = document.createElement("th");
        th.textContent = config.conditionLabel ?? "Condition";
        headerRow.appendChild(th);
    }

    const successTh = document.createElement("th");
    successTh.className = "succCol";
    successTh.textContent = "Success";
    headerRow.appendChild(successTh);

    const evTh = document.createElement("th");
    evTh.className = "evCol";
    evTh.textContent = "EV";
    headerRow.appendChild(evTh);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const [activationIndex, stat] of Object.entries(result.activationStats)) {
        const row = document.createElement("tr");

        if (config.includeConditionColumn) {
            const td = document.createElement("td");
            td.innerHTML = config.getConditionText
                ? config.getConditionText(activationIndex)
                : `Set Bespoke Condition Text`;
            row.appendChild(td);
        }

        const successTd = document.createElement("td");
        successTd.className = "succCol";
        successTd.textContent = `${(stat.anySuccess * 100).toFixed(1)}%`;
        row.appendChild(successTd);

        const evTd = document.createElement("td");
        evTd.className = "evCol";
        evTd.textContent = stat.expectedValue.toFixed(3);
        row.appendChild(evTd);

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
}

function renderDistributionTable(result: DiceActivationResult): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "distribution-table";

    const allOutcomes: string[] = Array.from(
        new Set(Object.values(result.activationStats).flatMap(stat => Object.keys(stat.distribution)))
    ).sort((a, b) => Number(a) - Number(b));

    const columnClasses: string[] = [];

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const outcome of allOutcomes) {
        const th = document.createElement("th");
        th.textContent = outcome;

        const colClass = outcome === "0" ? "failCol" : "succCol";
        th.classList.add(colClass);
        columnClasses.push(colClass);

        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const [_diceCount, stat] of Object.entries(result.activationStats)) {
        const row = document.createElement("tr");

        allOutcomes.forEach((outcome, index) => {
            const td = document.createElement("td");
            const prob = (stat.distribution as Record<string, number>)[outcome];

            td.textContent = prob && prob !== 0 ? `${(prob * 100).toFixed(3)}%` : " - ";
            td.classList.add(columnClasses[index]);
            row.appendChild(td);
        });

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
}

export function renderBirdResultSection(result: DiceActivationResult, config: ResultTableConfig): HTMLElement {
    const section = document.createElement("section");
    section.className = "bird-results-section";

    const tableContainer = document.createElement("div");
    tableContainer.className = "table-container";

    if (config.includeResultTable) {
        const resultTable = renderResultTable(result, config);
        tableContainer.appendChild(resultTable);
    }
    if (config.includeDistributionTable) {
        const distributionTable = renderDistributionTable(result);
        tableContainer.appendChild(distributionTable);
    }

    section.appendChild(tableContainer);

    const resultCard = document.getElementById(idFriendlyBirdname(result.birdName));
    resultCard?.appendChild(section);

    return section;
}
