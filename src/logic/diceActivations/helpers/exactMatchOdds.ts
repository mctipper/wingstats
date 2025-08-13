import type { Die, Food } from '@customTypes';

export function getExactMatchExcludingTargetOdds(die: Die, excludeFood: Food | Food[], rollCount: number): number {
    // base case protector, prevent recursion when only a single die is to be rerolled
    if (rollCount === 1) {
        throw new Error('Recursive reroll with only 1 die, aborting')
    }

    const foodToExcludeFromExactMatch = new Set(Array.isArray(excludeFood) ? excludeFood : [excludeFood]);

    const totalFaces = die.faces.length;

    const validFaceCount = die.faces.filter(face =>
        face.kind === 'single'
            ? !foodToExcludeFromExactMatch.has(face.food)
            : !foodToExcludeFromExactMatch.has(face.options[0]) && !foodToExcludeFromExactMatch.has(face.options[1])
    ).length;

    // all faces contain a excludeFood, no effect
    if (validFaceCount === 0) return 0;

    // probability of rolling (rollCount) identical die that do not include the excludeFood
    return validFaceCount / Math.pow(totalFaces, rollCount);
}
