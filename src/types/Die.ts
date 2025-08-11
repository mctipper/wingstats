import type { Food } from '@customTypes'

export type DieFace =
    | { kind: 'single'; food: Food }
    | { kind: 'choice'; options: [Food, Food] };

export type Die = {
    kind: 'basegame' | 'oceania';
    faces: DieFace[];
};
