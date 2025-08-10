import type { Food } from '../types/Food';
import type { Die, DieFace } from '../types/Die'

export function containsFood(face: DieFace, target: Food): boolean {
    return face.kind === 'single'
        ? face.food === target
        : face.options.includes(target);
}

export function findFacesWithFood(die: Die, food: Food): DieFace[] {
    return die.faces.filter(face => containsFood(face, food));
}
