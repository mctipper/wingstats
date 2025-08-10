import { describe, it, expect } from 'vitest';
import { containsFood, findFacesWithFood } from '../die';
import type { DieFace, Die } from '../../types/Die';
import type { Food } from '../../types/Food';


describe('containsFood', () => {
    it('returns true for matching single food', () => {
        const face: DieFace = { kind: 'single', food: 'Fish' };
        expect(containsFood(face, 'Fish')).toBe(true);
    });

    it('returns false for non-matching single food', () => {
        const face: DieFace = { kind: 'single', food: 'Fruit' };
        expect(containsFood(face, 'Seed')).toBe(false);
    });

    it('returns true if target is one of the choice options', () => {
        const face: DieFace = { kind: 'choice', options: ['Seed', 'Nectar'] };
        expect(containsFood(face, 'Seed')).toBe(true);
        expect(containsFood(face, 'Nectar')).toBe(true);
    });

    it('returns false if target is not in choice options', () => {
        const face: DieFace = { kind: 'choice', options: ['Rodent', 'Fruit'] };
        expect(containsFood(face, 'Fish')).toBe(false);
    });
});


describe('findFacesWithFood', () => {
    const die: Die = {
        kind: 'test',
        faces: [
            { kind: 'single', food: 'Invertebrate' },
            { kind: 'single', food: 'Seed' },
            { kind: 'single', food: 'Fish' },
            { kind: 'single', food: 'Fruit' },
            { kind: 'single', food: 'Rodent' },
            { kind: 'choice', options: ['Invertebrate', 'Seed'] },
        ],
    };

    it('works with single face containing the target', () => {
        const target: Food = 'Fish'
        const result = findFacesWithFood(die, target);
        expect(result).toEqual([
            { kind: 'single', food: target },
        ]);
    });

    it('returns all faces that contain the target food', () => {
        const target: Food = 'Invertebrate'
        const result = findFacesWithFood(die, target);
        expect(result).toHaveLength(2);
        expect(result).toEqual([
            { kind: 'single', food: target },
            { kind: 'choice', options: [target, 'Seed'] },
        ]);
    });

    it('returns empty array if no faces contain the food', () => {
        const target: Food = 'Nectar'
        const result = findFacesWithFood(die, target);
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });
});
