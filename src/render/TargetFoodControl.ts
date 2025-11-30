import { allFoods, type Food } from "@customTypes";
import { controlState } from "@state";
import { updateResults } from "@render";

export function createTargetFoodControl(): HTMLElement {
  const targetFoodContainer = document.getElementById("target-food-control");
  if (!targetFoodContainer) {
    throw new Error("target-food-control container not found in DOM");
  }

  targetFoodContainer.innerHTML = "";
  targetFoodContainer.className = "food-line";

  const foodsToShow = allFoods; // always show all

  foodsToShow.forEach((food) => {
    const img = document.createElement("img");
    img.src = `${import.meta.env.BASE_URL}assets/images/${food}.png`;
    img.alt = food;
    img.className = "food";

    img.addEventListener("click", () => {
      if (!controlState.availableFoods.has(food)) return; // ignore disabled
      if (controlState.selectedFoods.has(food)) {
        controlState.selectedFoods.delete(food);
        img.src = `${import.meta.env.BASE_URL}assets/images/${food}.png`;
        img.classList.remove("selected");
      } else {
        controlState.selectedFoods.add(food);
        img.src = `${import.meta.env.BASE_URL}assets/images/${food}-glow.png`;
        img.classList.add("selected");
      }
      updateFoodSelection(targetFoodContainer, controlState.selectedFoods);
    });

    targetFoodContainer.appendChild(img);
  });

  // initial sync
  refreshFoodUI(targetFoodContainer);
  return targetFoodContainer;
}

function updateFoodSelection(container: HTMLElement, selectedFoods: Set<Food>) {
  // what happens when food be clicked
  const imgs = container.querySelectorAll<HTMLImageElement>(".food");
  imgs.forEach((img) => {
    const food = img.alt as Food;
    if (selectedFoods.size === 0) {
      img.classList.remove("selected", "unselected");
    } else if (selectedFoods.has(food)) {
      img.classList.add("selected");
      img.classList.remove("unselected");
    } else {
      img.classList.add("unselected");
      img.classList.remove("selected");
    }
  });
  updateResults();
}

export function refreshFoodUI(container: HTMLElement) {
  // handling function when rendering and also will be called when 'dice type' is changed.

  // reset selectedFoods to none
  controlState.selectedFoods = new Set<Food>();

  const imgs = container.querySelectorAll<HTMLImageElement>(".food");
  imgs.forEach((img) => {
    const food = img.alt as Food;
    if (!controlState.availableFoods.has(food)) {
      img.classList.add("disabled");
      img.style.opacity = "0.4";
      img.style.pointerEvents = "none";
      img.classList.remove("selected", "unselected");
    } else {
      img.classList.remove("disabled");
      img.style.opacity = "";
      img.style.pointerEvents = "";
      img.classList.remove("selected", "unselected");
    }
  });

  updateResults();
}
