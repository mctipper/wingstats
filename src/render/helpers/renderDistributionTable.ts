import type { DiceActivationResult } from "@customTypes";

export function renderDistributionTable(result: DiceActivationResult): HTMLTableElement {
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
