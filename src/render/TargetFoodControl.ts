import { allFoods } from "@customTypes";
import { type Food } from "@customTypes";
import { controlState } from "@state";
import { updateResults } from "@render";

export function createTargetFoodControl(): HTMLElement {
  const targetFoodContainer = document.getElementById("target-food-control");
  if (!targetFoodContainer) {
    throw new Error("target-food-control container not found in DOM");
  }

  targetFoodContainer.innerHTML = "";
  targetFoodContainer.className = "food-line";

  allFoods.forEach((food) => {
    const img = document.createElement("img");
    img.src = `${import.meta.env.BASE_URL}assets/images/${food}.png`;
    img.alt = food;
    img.className = "food";

    img.addEventListener("click", () => {
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

  return targetFoodContainer;
}

function updateFoodSelection(container: HTMLElement, selectedFoods: Set<Food>) {
  const imgs = container.querySelectorAll<HTMLImageElement>(".food");
  imgs.forEach((img) => {
    const food = img.alt as Food;
    if (selectedFoods.size === 0) {
      // nothing selected - all same normal size
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
