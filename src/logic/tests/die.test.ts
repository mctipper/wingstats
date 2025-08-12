import { describe, it, expect } from 'vitest';
import { DieLogic } from '@logic/die';
import type {
    Die,
    DieFace
} from '@customTypes';
import { allDice } from '@definitions/diceDefinitions';


describe('containsFood', () => {
    it('returns true for matching single food', () => {
        const face: DieFace = { kind: 'single', food: 'Fish' };
        expect(DieLogic.containsFood(face, 'Fish')).toBe(true);
    });

    it('returns false for non-matching single food', () => {
        const face: DieFace = { kind: 'single', food: 'Fruit' };
        expect(DieLogic.containsFood(face, 'Seed')).toBe(false);
    });

    it('returns true if target is one of the choice options', () => {
        const face: DieFace = { kind: 'choice', options: ['Seed', 'Nectar'] };
        expect(DieLogic.containsFood(face, 'Seed')).toBe(true);
        expect(DieLogic.containsFood(face, 'Nectar')).toBe(true);
    });

    it('returns false if target is not in choice options', () => {
        const face: DieFace = { kind: 'choice', options: ['Rodent', 'Fruit'] };
        expect(DieLogic.containsFood(face, 'Fish')).toBe(false);
    });
});

describe('getFoodOdds', () => {
    it('returns correct odds for a food that appears once', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, 'Fish');
        expect(odds).toBeCloseTo(1 / 6);
    });

    it('returns correct odds for a food that appears on multiple faces', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, 'Invertebrate');
        expect(odds).toBeCloseTo(2 / 6);
    });

    it('returns correct odds for array foods (all single)', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, ['Fish', 'Rodent']);
        expect(odds).toBeCloseTo(2 / 6);
    });

    it('returns correct odds for array foods (one single, one multiple)', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, ['Fish', 'Invertebrate']);
        // one of invertibrate/seed; one of invertibrate; one of fish
        expect(odds).toBeCloseTo(3 / 6);
    });

    it('returns correct odds for array foods (all multiple)', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, ['Invertebrate', 'Seed']);
        // one of invertibrate/seed; one of invertibrate; one of seed
        expect(odds).toBeCloseTo(3 / 6);
    });

    it('returns 0 for food not present on any face', () => {
        const odds = DieLogic.getFoodOdds(allDice.basegame, 'Nectar');
        expect(odds).toBe(0);
    });

    it('confirm two nectar found on oceaniaDie', () => {
        const odds = DieLogic.getFoodOdds(allDice.oceania, 'Nectar');
        expect(odds).toBe(2 / 6);
    });

    it('handles empty die gracefully', () => {
        const emptyDie: Die = { kind: 'basegame', faces: [] };
        const odds = DieLogic.getFoodOdds(emptyDie, 'Seed');
        expect(odds).toBe(0);
    });
});
