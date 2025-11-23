/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from "vitest";
import { createTargetFoodControl } from "@render";
import { controlState } from "@state";
import { type Food } from "@customTypes";
import { allFoods } from "@customTypes";

describe("createTargetFoodControl", () => {
    beforeEach(() => {
        // reset DOM and state before each test
        document.body.innerHTML = `<div id="target-food-control"></div>`;
        controlState.selectedFoods.clear();
    });

    it("renders all food images", () => {
        const container = createTargetFoodControl();
        const imgs = container.querySelectorAll<HTMLImageElement>("img.food");
        expect(imgs.length).toBe(allFoods.length);

        // each image should have correct alt and src
        allFoods.forEach((food, idx) => {
            expect(imgs[idx].alt).toBe(food);
            expect(imgs[idx].src).toContain(`${food}.png`);
        });
    });

    it("selects a food on click", () => {
        const container = createTargetFoodControl();
        const firstImg = container.querySelector<HTMLImageElement>("img.food")!;
        const foodName: Food = firstImg.alt as Food;

        firstImg.click();

        expect(controlState.selectedFoods.has(foodName)).toBe(true);
        expect(firstImg.classList.contains("selected")).toBe(true);
        expect(firstImg.src).toContain(`${foodName}-glow.png`);
    });

    it("deselects a food on second click", () => {
        const container = createTargetFoodControl();
        const firstImg = container.querySelector<HTMLImageElement>("img.food")!;
        const foodName: Food = firstImg.alt as Food;

        firstImg.click(); // select
        firstImg.click(); // deselect

        expect(controlState.selectedFoods.has(foodName)).toBe(false);
        expect(firstImg.classList.contains("selected")).toBe(false);
        expect(firstImg.src).toContain(`${foodName}.png`);
    });

    it("marks unselected foods with 'unselected' class when one is selected", () => {
        const container = createTargetFoodControl();
        const imgs = container.querySelectorAll<HTMLImageElement>("img.food");

        imgs[0].click(); // select first food

        expect(imgs[0].classList.contains("selected")).toBe(true);
        for (let i = 1; i < imgs.length; i++) {
            expect(imgs[i].classList.contains("unselected")).toBe(true);
        }
    });

    it("removes 'unselected' class when all foods are deselected", () => {
        const container = createTargetFoodControl();
        const imgs = container.querySelectorAll<HTMLImageElement>("img.food");

        imgs[0].click(); // select
        imgs[0].click(); // deselect

        imgs.forEach((img) => {
            expect(img.classList.contains("unselected")).toBe(false);
        });
    });

    it("supports multiple selections", () => {
        const container = createTargetFoodControl();
        const imgs = container.querySelectorAll<HTMLImageElement>("img.food");

        imgs[0].click();
        imgs[1].click();

        expect(controlState.selectedFoods.size).toBe(2);
        expect(imgs[0].classList.contains("selected")).toBe(true);
        expect(imgs[1].classList.contains("selected")).toBe(true);
    });
});
