import type { Food, Nest, DieVersions, Habitat, Expansion } from '@customTypes';



export type ActivationStats = {
    activationName: DiceActivations | DrawCardActivations;
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
    | 'sequential'
    | 'uniques'
    | 'withholding';


export type DiceActivations =
    '__TEST__'
    | 'rollAnyXDice'
    | 'resetTheBirdfeeder'
    | 'rollDiceNotInTheBirdfeeder'
    | 'pushYourLuck'
    | 'rollDiceForXBirdsInHabitat'
    | 'maskedLapwing'
    | 'philippineEagle';


export type DiceActivationInput = {
    birdName: string,
    targetFood: Food | Food[],
    dieCount: number,
    rollCount: number,
    activationResultMode: ActivationResultMode,
}


export type DiceActivationResult = DiceActivationInput & {
    die: DieVersions,
    activationStats: Record<number, ActivationStats>
}

export type WingspanOperator = {
    op: '<' | '<=' | '>' | '>=';
    value: number;
};

export type DrawActivationTargetMap = {
    Habitat: Habitat | Habitat[];
    Food: Food | Food[];
    Wingspan: WingspanOperator;
    Nest: Nest | Nest[];
    Predator: boolean;
};

export type DrawActivationInput = {
    birdName: string;
    target: Habitat | Habitat[] | Food | Food[] | Nest | Nest[] | WingspanOperator | boolean;
    targetType: DrawCardTargets;
    drawCount: number;
    fromTrayOnly: boolean;
    activationResultMode: ActivationResultMode
}

export type DrawActivationResult = DrawActivationInput & {
    activationStats: Record<number, Record<Expansion, ActivationStats>>
}


export type DrawCardActivations =
    '__TEST__'
    | 'matchPredator'
    | 'matchWingspan'
    | 'matchNest'
    | 'matchHabitat'
    | 'matchFood'
    | 'pushYourLuck';


export type DrawCardTargets =
    'Habitat'
    | 'Food'
    | 'Wingspan'
    | 'Nest'
    | 'Predator'
