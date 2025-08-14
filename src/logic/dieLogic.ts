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

function getAllUniqueFoodsOnDie(die: Die): Food[] {
    const foodSet = new Set<Food>();

    for (const face of die.faces) {
        if (face.kind === 'single') {
            foodSet.add(face.food);
        } else {
            for (const option of face.options) {
                foodSet.add(option);
            }
        }
    }

    return Array.from(foodSet);
}


export const DieLogic = {
    containsFood,
    getFoodOdds,
    getAllUniqueFoodsOnDie
}