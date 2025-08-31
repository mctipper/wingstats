import type { DiceActivationResult } from "@customTypes";
import { idFriendlyBirdname } from "@render/helpers/idFriendlyBirdName";
import { renderPrimaryLayout } from "@render/primaryRender";

export function renderRollDiceNotInBirdfeederResult(layoutId: string, result: DiceActivationResult): HTMLElement {
  // Create layout and bird card
  const layout = renderPrimaryLayout(layoutId, result);

  // Build section to hold tables
  const section = document.createElement("section");
  section.className = "bird-results-section";

  // Create flex container for side-by-side tables
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container"; // style with display: flex

  // === Result Table ===
  const resultTable = document.createElement("table");
  resultTable.className = "result-table";
  resultTable.innerHTML = `
    <thead>
      <tr><th>Condition</th><th>Success</th><th>EV</th></tr>
    </thead>
    <tbody>
      ${Object.entries(result.activationStats).map(([diceCount, stat]) => `
        <tr>
          <td>${diceCount} dice not in the birdfeeder</td>
          <td>${(stat.anySuccess * 100).toFixed(1)}%</td>
          <td>${stat.expectedValue.toFixed(3)}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
  tableContainer.appendChild(resultTable);

  // === Distribution Table (only if >1 dice count) ===
  const totalDistributionEntries = Object.values(result.activationStats)
    .reduce((acc, stat) => acc + Object.keys(stat.distribution).length, 0);
  console.log()
  console.log(totalDistributionEntries);

  if (totalDistributionEntries > 1) {
    const distributionTable = document.createElement("table");
    distributionTable.className = "distribution-table";
    distributionTable.innerHTML = `
      <thead>
        <tr><th>Result</th><th>Probability</th></tr>
      </thead>
      <tbody>
        ${Object.entries(result.activationStats).flatMap(([_, stat]) =>
      Object.entries(stat.distribution).map(([outcome, prob]) => `
            <tr>
              <td>${outcome}</td>
              <td>${(prob * 100).toFixed(3)}%</td>
            </tr>
          `)
    ).join("")}
      </tbody>
    `;
    tableContainer.appendChild(distributionTable);
  }

  section.appendChild(tableContainer);

  // Append section to result card
  const resultCard = document.getElementById(idFriendlyBirdname(result.birdName));
  resultCard?.appendChild(section);

  return layout;
}
