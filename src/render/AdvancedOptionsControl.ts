import { controlState } from "@state";
import { updateResults } from "@render";
import { formatOptionKey } from "@utils";

// Local helper to format camelCase keys into readable sentences (e.g., 'rerollWhenAllEqual' -> 'Reroll When All Equal')

export function createAdvancedOptionsControl(): HTMLElement {
  // Use the ID from the HTML where this control should live
  const advancedOptionsContainer = document.getElementById(
    "advanced-options-control"
  )!;

  advancedOptionsContainer.innerHTML = "";

  const container = document.createElement("div");
  container.className = "advanced-options-section";

  // header
  const header = document.createElement("div");
  header.className = "advanced-options-header";
  header.textContent = "▸ Advanced Options (Click to Expand)";
  header.setAttribute("aria-expanded", "false");

  // content
  const content = document.createElement("div");
  content.className = "advanced-options-content hidden";

  // build checkboxes
  // casting to Record<string, any> allows iteration over keys (just to make it easier)
  const advancedOptions = controlState.advancedOptions as Record<string, any>;

  for (const key in advancedOptions) {
    const value = advancedOptions[key];

    // numberOfRolls is the only non-boolean
    if (key === "numberOfRolls") {
      const value = advancedOptions[key] as number;

      const label = document.createElement("label");
      label.className = "advanced-option-label";

      const labelText = document.createTextNode(formatOptionKey(key) + ":");

      const numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.min = "1"; // Minimum value is 1
      numberInput.max = "5"; // Maximum value is 5
      numberInput.value = String(value); // Set the initial value from state
      numberInput.id = `opt-${key}`;

      // Handle change: Update state and results
      numberInput.onchange = () => {
        // Get the new value and parse it as an integer
        let newValue = parseInt(numberInput.value, 10);

        // Ensure the value is within bounds (1 to 5)
        if (isNaN(newValue) || newValue < 1) {
          newValue = 1;
        } else if (newValue > 5) {
          newValue = 5;
        }

        // Update the input field value to reflect the clamped value
        numberInput.value = String(newValue);

        // Update the controlState and trigger a re-render
        (controlState.advancedOptions as any)[key] = newValue;
        updateResults();
      };

      label.appendChild(labelText);
      label.appendChild(numberInput);

      content.appendChild(label);

      // skipskip
      continue;
    }

    // all the checkboxes
    if (typeof value === "boolean") {
      const label = document.createElement("label");
      label.className = "advanced-option-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = value;
      checkbox.id = `opt-${key}`;

      checkbox.setAttribute("aria-label", formatOptionKey(key));

      checkbox.onchange = () => {
        (controlState.advancedOptions as any)[key] = checkbox.checked;
        updateResults();
      };

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(formatOptionKey(key)));

      content.appendChild(label);
    }
  }

  // --- 4. Toggle Logic ---
  header.onclick = () => {
    // Toggle the 'hidden' class on the content
    const isHidden = content.classList.toggle("hidden");

    // Update the aria-expanded attribute for accessibility
    header.setAttribute("aria-expanded", String(!isHidden));

    const icon = isHidden ? "▸" : "▾";
    const action = isHidden ? "Expand" : "Collapse";

    header.textContent = `${icon} Advanced Options (Click to ${action})`;
  };

  // Append all parts to the root element
  container.appendChild(header);
  container.appendChild(content);
  advancedOptionsContainer.appendChild(container);

  return advancedOptionsContainer;
}
