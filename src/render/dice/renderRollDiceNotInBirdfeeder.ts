import type { DiceActivationResult } from "@customTypes";
import { idFriendlyBirdname } from "@render/helpers/idFriendlyBirdName";
import { renderPrimaryLayout } from "@render/primaryRender";

export function renderRollDiceNotInBirdfeederResult(layoutId: string, result: DiceActivationResult): HTMLElement {
  const layout = renderPrimaryLayout(layoutId, result);

  // seciont to hold result tables
  const section = document.createElement("section");
  section.className = "bird-results-section";

  // container to allow side-by-side rendering of tables
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";

  // result table
  const resultTable = document.createElement("table");
  resultTable.className = "result-table";
  resultTable.innerHTML = `
    <thead>
      <tr><th>Condition</th><th class="succCol">Success</th><th class="evCol">EV</th></tr>
    </thead>
    <tbody>
      ${Object.entries(result.activationStats).map(([diceCount, stat]) => `
        <tr>
          <td><strong><i>${diceCount}</i></strong> ${diceCount == '1' ? "die" : "dice"}</td>
          <td class="succCol">${(stat.anySuccess * 100).toFixed(1)}%</td>
          <td class="evCol">${stat.expectedValue.toFixed(3)}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
  tableContainer.appendChild(resultTable);

  // distribution of outcomes
  const allOutcomes: string[] = Array.from(
    new Set(Object.values(result.activationStats).flatMap(stat => Object.keys(stat.distribution)))
  ).sort((a, b) => Number(a) - Number(b));

  const distributionTable = document.createElement("table");
  distributionTable.className = "distribution-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const columnClasses: string[] = [];

  for (const outcome of allOutcomes) {
    const th = document.createElement("th");
    th.textContent = outcome;

    const colClass = outcome === "0" ? "failCol" : "succCol";
    th.classList.add(colClass);
    columnClasses.push(colClass);

    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  distributionTable.appendChild(thead);

  // one row per die not in the birdfeeder
  const tbody = document.createElement("tbody");

  for (const [_diceCount, stat] of Object.entries(result.activationStats)) {
    const row = document.createElement("tr");

    allOutcomes.forEach((outcome, index) => {
      const td = document.createElement("td");
      const prob = (stat.distribution as Record<string, number>)[outcome];

      td.textContent = prob && prob !== 0 ? `${(prob * 100).toFixed(3)}%` : " - ";
      td.classList.add(columnClasses[index]); // Apply matching class
      row.appendChild(td);
    });

    tbody.appendChild(row);
  }

  distributionTable.appendChild(tbody);
  tableContainer.appendChild(distributionTable);

  // append append append
  section.appendChild(tableContainer);

  const resultCard = document.getElementById(idFriendlyBirdname(result.birdName));
  resultCard?.appendChild(section);

  return layout;
}
