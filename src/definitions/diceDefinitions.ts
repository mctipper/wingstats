import type { Die, DieVersions } from '@customTypes';

export const baseGameDie: Die = {
    version: 'basegame',
    faces: [
        { kind: 'single', food: 'Invertebrate' },
        { kind: 'single', food: 'Seed' },
        { kind: 'single', food: 'Fish' },
        { kind: 'single', food: 'Fruit' },
        { kind: 'single', food: 'Rodent' },
        { kind: 'choice', options: ['Invertebrate', 'Seed'] },
    ],
};

export const oceaniaDie: Die = {
    version: 'oceania',
    faces: [
        { kind: 'single', food: 'Invertebrate' },
        { kind: 'choice', options: ['Seed', 'Nectar'] },
        { kind: 'single', food: 'Fish' },
        { kind: 'choice', options: ['Fruit', 'Nectar'] },
        { kind: 'single', food: 'Rodent' },
        { kind: 'choice', options: ['Invertebrate', 'Seed'] },
    ],
};

export const allDice: Record<DieVersions, Die> = {
    basegame: baseGameDie,
    oceania: oceaniaDie,
};
