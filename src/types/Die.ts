import type { Food } from '@customTypes'

export type DieVersions =
    'basegame'
    | 'oceania';


export type DieFace =
    | { kind: 'single'; food: Food }
    | { kind: 'choice'; options: [Food, Food] };

export type Die = {
    version: DieVersions;
    faces: DieFace[];
};
