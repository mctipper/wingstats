import type { Die } from '@customTypes';

export const baseGameDie: Die = {
    kind: 'basegame',
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
    kind: 'oceania',
    faces: [
        { kind: 'single', food: 'Invertebrate' },
        { kind: 'choice', options: ['Seed', 'Nectar'] },
        { kind: 'single', food: 'Fish' },
        { kind: 'choice', options: ['Fruit', 'Nectar'] },
        { kind: 'single', food: 'Rodent' },
        { kind: 'choice', options: ['Invertebrate', 'Seed'] },
    ],
};

export const allDice: Record<Die['kind'], Die> = {
    basegame: baseGameDie,
    oceania: oceaniaDie,
};
