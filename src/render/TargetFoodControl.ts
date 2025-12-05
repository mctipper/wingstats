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
    const foodItemWrapper = document.createElement("div");
    foodItemWrapper.className = "food-item-wrapper";
    foodItemWrapper.dataset.food = food;

    const img = document.createElement("img");
    img.src = `${import.meta.env.BASE_URL}assets/images/${food}.png`;
    img.alt = food;
    img.className = "food";

    const foodNameText = document.createElement("span");
    foodNameText.textContent = food;
    foodNameText.className = "food-name-text";
    foodNameText.style.display = "none";

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
      updateFoodSelection(targetFoodContainer);
    });

    foodItemWrapper.appendChild(img);
    foodItemWrapper.appendChild(foodNameText);

    targetFoodContainer.appendChild(foodItemWrapper);
  });

  // initial sync
  resetFoodUI(targetFoodContainer);
  return targetFoodContainer;
}

function updateFoodSelection(container: HTMLElement) {
  const wrappers =
    container.querySelectorAll<HTMLDivElement>(".food-item-wrapper");

  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector<HTMLImageElement>(".food");
    const text = wrapper.querySelector<HTMLSpanElement>(".food-name-text");

    if (!img || !text) return;

    const food = img.alt as Food;

    // update avaiability
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

    // update selection
    if (controlState.selectedFoods.size === 0) {
      // No selection: remove all state classes
      img.classList.remove("selected", "unselected");
      text.style.display = "none"; // Hide text
    } else if (controlState.selectedFoods.has(food)) {
      // Food is selected
      img.classList.add("selected");
      img.classList.remove("unselected");
      text.style.display = "block"; // Show text
    } else {
      // Food is not selected (but others are)
      img.classList.add("unselected");
      img.classList.remove("selected");
      text.style.display = "none"; // Hide text
    }
  });

  updateResults();
}

export function resetFoodUI(container: HTMLElement) {
  // handling function when rendering and also will be called when 'dice type' is changed.

  // reset selectedFoods to none
  controlState.selectedFoods = new Set<Food>();

  updateFoodSelection(container);
  updateResults;
}
