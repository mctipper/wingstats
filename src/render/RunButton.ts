// src/render/RunButton.ts
import { controlState } from "@state";

export function createRunButton(): HTMLButtonElement {
    const runButtonContainer = document.getElementById("run-button");
    if (!runButtonContainer) {
        throw new Error("run-button container not found in DOM");
    }

    runButtonContainer.innerHTML = "";

    const button = document.createElement("button");
    button.textContent = "Run!";
    button.id = "run-button-element";

    button.addEventListener("click", () => {
        const resultsDiv = document.getElementById("results");
        if (!resultsDiv) {
            throw new Error("results container not found in DOM");
        }

        resultsDiv.textContent = `Dice: ${controlState.dieCount}, Foods: ${Array.from(controlState.selectedFoods).join(", ") || "none"
            }`;
    });

    runButtonContainer.appendChild(button);

    return button;
}
