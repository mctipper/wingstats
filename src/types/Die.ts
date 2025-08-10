import type { Food } from './Food.ts'

export type DieFace =
    | { kind: 'single'; food: Food }
    | { kind: 'choice'; options: [Food, Food] };

export type Die = {
    kind: string;
    faces: DieFace[];
};

export type BaseGameDie = {
    kind: 'base',
    faces: [
        { kind: 'single', food: 'Invertebrate' },
        { kind: 'single', food: 'Seed' },
        { kind: 'single', food: 'Fish' },
        { kind: 'single', food: 'Fruit' },
        { kind: 'single', food: 'Rodent' },
        { kind: 'choice', options: ['Invertebrate', 'Seed'] },
    ],
};

export type OceaniaDie = {
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
