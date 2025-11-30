import { createDiceControl, createTargetFoodControl } from "@render";
import { createDiceTypeControl } from "./render/DiceTypeControl";

// application version for sanity eyeballing
console.log(`App version: ${__APP_VERSION__}`);

const layoutRoot = document.getElementById("layout-root");

if (layoutRoot) {
  createDiceTypeControl();
  createDiceControl();
  createTargetFoodControl();
}
