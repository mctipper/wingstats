import type { Food } from '@customTypes';



export type ActivationStats = {
    activationName: DiceActivations;
    // probability of each count of success
    distribution: Record<number, number>;
    // P(success >= 1)
    anySuccess: number;
    // P(success = 0)
    failure: number;
    // Sum (successCount * probability) (will equal anySuccess for Binary success activations)
    expectedValue: number;
};

export type ActivationResultMode =
    // >=1 success counts as 1 EV
    'binary'
    // each success count towards EV
    | 'binomial'
    | 'sequential';


export type DiceActivations =
    '__TEST__'
    | 'rollAnyXDice'
    | 'resetTheBirdfeeder'
    | 'rollDiceNotInTheBirdfeeder'
    | 'pushYourLuck';


export type DiceActivationInput = {
    birdName: string,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number,
    activationResultMode: ActivationResultMode,
}

export type DiceActivationResult = DiceActivationInput & {
    activationStats: Record<number, ActivationStats>
}
