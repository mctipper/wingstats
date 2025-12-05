import { controlState } from "@state";
import { resetFoodUI, updateResults } from "@render";
import { diceList, allFoods } from "@customTypes";
import { type Die } from "@customTypes";
import { capitaliseFirstLetter } from "@utils";

export function createDiceTypeControl(): HTMLElement {
  const diceTypeContainer = document.getElementById("dice-type-control")!;

  const row = document.createElement("div");
  row.className = "dice-type-row";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "<";

  const typeSpan = document.createElement("div");
  typeSpan.className = "dice-type-line";
  typeSpan.id = "die-type";

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = ">";

  row.appendChild(decreaseBtn);
  row.appendChild(typeSpan);
  row.appendChild(increaseBtn);

  function updateDisplay() {
    typeSpan.textContent = `${capitaliseFirstLetter(
      controlState.die.dieType
    )} Dice`;
    setDie(controlState.die);
    updateResults();
  }

  function cycleDie() {
    // cycle of the die types (e.g., from "base" to "oceania")
    const currentIndex = diceList.findIndex(
      (d) => d.dieType === controlState.die.dieType
    );
    const nextIndex = (currentIndex + 1) % diceList.length;
    controlState.die = diceList[nextIndex];
    updateDisplay();
  }

  decreaseBtn.addEventListener("click", cycleDie);
  increaseBtn.addEventListener("click", cycleDie);

  diceTypeContainer.appendChild(row);

  updateDisplay();

  return diceTypeContainer;
}

function setDie(die: Die) {
  controlState.die = die;

  if (die.dieType === "base") {
    // nectar not usable
    controlState.availableFoods = new Set(
      allFoods.filter((f) => f !== "nectar")
    );
  } else {
    // oceania die allows nectar
    controlState.availableFoods = new Set(allFoods);
  }
  const container = document.getElementById("target-food-control");
  if (container) {
    resetFoodUI(container);
  }
}
