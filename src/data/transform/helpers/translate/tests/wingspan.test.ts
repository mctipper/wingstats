import { describe, it, expect } from 'vitest';
import { translateWingspan } from '@data/transform/helpers/translate/wingspan';

describe("translateWingspan", () => {
    it("translates '*' (flightless) to 0", () => {
        // Zero will be handled specially in code logic, wanted to force a number type for wingspan property
        expect(translateWingspan("*")).toBe(0);
    });

    it("translates valid number strings", () => {
        expect(translateWingspan("110")).toBe(110);
        expect(translateWingspan("25")).toBe(25);
        expect(translateWingspan("0")).toBe(0);
    });

    it("throws on non-numeric strings", () => {
        expect(() => translateWingspan("abc")).toThrow("Unexpected non-number for Wingspan: abc");
    });

    it("translates negative numbers", () => {
        // this 'should' never occur, but check that logic is still correct (data validator will catch these)
        expect(translateWingspan("-10")).toBe(-10);
    });

    it("throws on empty string", () => {
        expect(() => translateWingspan("")).toThrow("Unexpected non-number for Wingspan: ");
    });
});
