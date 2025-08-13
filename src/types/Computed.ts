import type { ActivationStats, Food, ActivationResultMode } from '@customTypes';


export type diceActivationResult = {
    birdName: string,
    targetFood: Food | Food[],
    rollCount: number,
    activationStats: ActivationStats
}

export type diceActivationInput = {
    birdName: string,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
}
