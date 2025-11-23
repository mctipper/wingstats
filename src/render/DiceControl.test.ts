/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import { createDiceControl } from "./DiceControl";
import { controlState } from "@state";

describe("createDiceControl", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // reset DOM and state before each test
    document.body.innerHTML = `<div id="dice-control"></div>`;
    controlState.dieCount = 1;
    container = createDiceControl();
  });

  it("renders initial die count and one die image", () => {
    const dieCountSpan = container.querySelector("#die-count")!;
    expect(dieCountSpan.textContent).toBe("1 die");

    const diceImages = container.querySelectorAll("#dice-images .die");
    expect(diceImages.length).toBe(1);
  });

  it("increments die count when > button clicked", () => {
    const increaseBtn = container.querySelector<HTMLButtonElement>("button:last-child")!;
    increaseBtn.click();

    const dieCountSpan = container.querySelector("#die-count")!;
    expect(dieCountSpan.textContent).toBe("2 dice");

    const diceImages = container.querySelectorAll("#dice-images .die");
    expect(diceImages.length).toBe(2);
  });

  it("decrements die count when < button clicked", () => {
    // first increment to 2
    const increaseBtn = container.querySelector<HTMLButtonElement>("button:last-child")!;
    increaseBtn.click();

    const decreaseBtn = container.querySelector<HTMLButtonElement>("button:first-child")!;
    decreaseBtn.click();

    const dieCountSpan = container.querySelector("#die-count")!;
    expect(dieCountSpan.textContent).toBe("1 die");

    const diceImages = container.querySelectorAll("#dice-images .die");
    expect(diceImages.length).toBe(1);
  });

  it("does not decrement below 1", () => {
    const decreaseBtn = container.querySelector<HTMLButtonElement>("button:first-child")!;
    decreaseBtn.click(); // already at 1

    expect(controlState.dieCount).toBe(1);
    const dieCountSpan = container.querySelector("#die-count")!;
    expect(dieCountSpan.textContent).toBe("1 die");
  });

  it("does not increment above 5", () => {
    const increaseBtn = container.querySelector<HTMLButtonElement>("button:last-child")!;
    for (let i = 0; i < 10; i++) increaseBtn.click();

    expect(controlState.dieCount).toBe(5);
    const dieCountSpan = container.querySelector("#die-count")!;
    expect(dieCountSpan.textContent).toBe("5 dice");

    const diceImages = container.querySelectorAll("#dice-images .die");
    expect(diceImages.length).toBe(5);
  });
});
