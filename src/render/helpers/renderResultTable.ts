import type { DiceActivationResult } from "@customTypes";

type ResultTableConfig = {
    includeConditionColumn: boolean;
    conditionLabel?: string;
    getConditionText?: (diceCount: string) => string;
};

export function renderResultTable(result: DiceActivationResult, config: ResultTableConfig): HTMLTableElement {
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

    for (const [diceCount, stat] of Object.entries(result.activationStats)) {
        const row = document.createElement("tr");

        if (config.includeConditionColumn) {
            const td = document.createElement("td");
            td.innerHTML = config.getConditionText
                ? config.getConditionText(diceCount)
                : `<strong><i>${diceCount}</i></strong> ${Number(diceCount) === 1 ? "die" : "dice"}`;
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
