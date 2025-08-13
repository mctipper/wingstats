import type { DiceActivations } from '@customTypes';

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
