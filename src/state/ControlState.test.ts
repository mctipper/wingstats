import { describe, it, expect, beforeEach } from "vitest";
import { controlState } from "@state";
import type { Food } from "@customTypes";

describe("controlState", () => {
    beforeEach(() => {
        // reset state before each test
        controlState.selectedBird = "";
        controlState.dieCount = 3;
        controlState.selectedFoods = new Set<Food>();
    });

    it("has correct initial values", () => {
        expect(controlState.selectedBird).toBe("");
        expect(controlState.dieCount).toBe(3);
        expect(controlState.selectedFoods.size).toBe(0);
    });

    it("allows updating selectedBird", () => {
        controlState.selectedBird = "sparrow";
        expect(controlState.selectedBird).toBe("sparrow");
    });

    it("allows updating dieCount", () => {
        controlState.dieCount = 5;
        expect(controlState.dieCount).toBe(5);
    });

    it("allows adding and removing foods", () => {
        controlState.selectedFoods.add("fruit");
        controlState.selectedFoods.add("seed");
        expect(controlState.selectedFoods.has("fruit")).toBe(true);
        expect(controlState.selectedFoods.has("seed")).toBe(true);
        expect(controlState.selectedFoods.size).toBe(2);

        controlState.selectedFoods.delete("fruit");
        expect(controlState.selectedFoods.has("fruit")).toBe(false);
        expect(controlState.selectedFoods.size).toBe(1);
    });

    it("can be cleared", () => {
        controlState.selectedFoods.add("rodent");
        controlState.selectedFoods.clear();
        expect(controlState.selectedFoods.size).toBe(0);
    });
});
