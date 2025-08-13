import type { ActivationStats, Food, ActivationResultMode } from '@customTypes';


export type diceActivationResult = {
    name: string,
    targetFood: Food | Food[],
    rollCount: number,
    activationStats: ActivationStats
}

export type diceActivationInput = {
    name: string, targetFood: Food | Food[], rollCount: number, activationResultMode: ActivationResultMode
}
