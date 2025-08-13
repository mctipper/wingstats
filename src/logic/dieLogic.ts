import type {
    Die,
    DieFace,
    Food
} from '@customTypes';

function containsFood(face: DieFace, target: Food): boolean {
    return face.kind === 'single'
        ? face.food === target
        : face.options.includes(target);
}

function getFoodOdds(die: Die, target: Food | Food[]): number {
    const targets = Array.isArray(target) ? target : [target];
    const totalFaces = die.faces.length;

    const matchingFaces = die.faces.filter(face =>
        targets.some(food => containsFood(face, food))
    );

    return matchingFaces.length === 0 ? 0 : matchingFaces.length / totalFaces;
}


export const DieLogic = {
    containsFood,
    getFoodOdds
}