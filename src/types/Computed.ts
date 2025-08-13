import type { ActivationStats, Food, ActivationResultMode } from '@customTypes';


export type DiceActivationResult = {
    birdName: string,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode,
    activationStats: Record<number, ActivationStats>
}

export type DiceActivationInput = {
    birdName: string,
    targetFood: Food | Food[],
    rollCount: number,
    activationResultMode: ActivationResultMode
}
