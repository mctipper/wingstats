import { describe, it, expect } from 'vitest';
import { createHabitatInfo } from '@data/transform/helpers/create/createHabitatInfo';
import type {
    HabitatInfo
} from '@customTypes';

describe('createHabitatInfo', () => {
    it('returns habitatCount = 1 and multipleHabitats = false when one habitat is true', () => {
        const input = { Forest: true, Grassland: false, Wetland: false };
        const result: HabitatInfo = createHabitatInfo(input);
        expect(result).toEqual({ ...input, habitatCount: 1, multipleHabitats: false });
    });

    it('returns habitatCount = 2 and multipleHabitats = true when two habitats are true', () => {
        const input = { Forest: true, Grassland: true, Wetland: false };
        const result: HabitatInfo = createHabitatInfo(input);
        expect(result).toEqual({ ...input, habitatCount: 2, multipleHabitats: true });
    });

    it('returns habitatCount = 3 and multipleHabitats = true when all habitats are true', () => {
        const input = { Forest: true, Grassland: true, Wetland: true };
        const result: HabitatInfo = createHabitatInfo(input);
        expect(result).toEqual({ ...input, habitatCount: 3, multipleHabitats: true });
    });

    it('returns habitatCount = 0 and multipleHabitats = false when all habitats are false', () => {
        // this 'should' never occur, but check that logic is still correct (data validator will catch these)
        const input = { Forest: false, Grassland: false, Wetland: false };
        const result: HabitatInfo = createHabitatInfo(input);
        expect(result).toEqual({ ...input, habitatCount: 0, multipleHabitats: false });
    });
});
