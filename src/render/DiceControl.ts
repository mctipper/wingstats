import { controlState } from "@state";
import { updateResults } from "@render";

export function createDiceControl(): HTMLElement {
  const diceControlContainer = document.getElementById("dice-control")!;

  const row = document.createElement("div");
  row.className = "dice-row";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "<";

  const diceImagesdiceControlContainer = document.createElement("div");
  diceImagesdiceControlContainer.id = "dice-images";

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = ">";

  row.appendChild(decreaseBtn);
  row.appendChild(diceImagesdiceControlContainer);
  row.appendChild(increaseBtn);

  // text label below the die images
  const dieCountSpan = document.createElement("div");
  dieCountSpan.id = "die-count";

  function updateDisplay() {
    dieCountSpan.textContent = `${controlState.dieCount} ${
      controlState.die.dieType
    } ${controlState.dieCount === 1 ? "die" : "dice"}`;
    renderDiceLine(controlState.dieCount, diceImagesdiceControlContainer);
    updateResults();
  }

  decreaseBtn.addEventListener("click", () => {
    if (controlState.dieCount > 1) {
      controlState.dieCount--;
      updateDisplay();
    }
  });

  increaseBtn.addEventListener("click", () => {
    if (controlState.dieCount < 5) {
      controlState.dieCount++;
      updateDisplay();
    }
  });

  diceControlContainer.appendChild(row);
  diceControlContainer.appendChild(dieCountSpan);

  updateDisplay();

  return diceControlContainer;
}

function renderDiceLine(count: number, diceControlContainer: HTMLElement) {
  diceControlContainer.innerHTML = "";
  diceControlContainer.className = "dice-line";

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = `${import.meta.env.BASE_URL}assets/images/die.png`;
    img.alt = `Die ${i + 1}`;
    img.className = "die";
    diceControlContainer.appendChild(img);
  }
}
