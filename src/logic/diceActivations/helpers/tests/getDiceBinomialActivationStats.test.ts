import { describe, it, expect } from 'vitest';
import { allDice } from '@definitions/diceDefinitions';
import type { DiceActivations, Food } from '@customTypes';
import { getDiceBinomialActivationStats } from '../getDiceBinomialActivationStats';

type TestCase = {
    activationName: DiceActivations,
    food: Food | Food[];
    rolls: number;
    permitReroll: boolean;
    expected: {
        distribution: Record<number, number>
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const positiveCases: TestCase[] = [
    // one food on one face
    {
        food: 'Fish', rolls: 1, activationName: '__TEST__', permitReroll: false, expected: {
            distribution: {
                0: 0.8333,
                1: 0.1667
            },
            anySuccess: 0.1667,
            failure: 0.8333,
            expectedValue: 0.1667
        }
    },
    {
        food: 'Fish', rolls: 5, activationName: '__TEST__', permitReroll: true, expected: {
            distribution: {
                0: 0.4015,
                1: 0.4021,
                2: 0.1609,
                3: 0.0322,
                4: 0.0032,
                5: 0.0001
            },
            anySuccess: 0.5985,
            failure: 0.4015,
            expectedValue: 0.8339
        }
    },
    {
        food: 'Fish', rolls: 5, activationName: '__TEST__', permitReroll: false, expected: {
            distribution: {
                0: 0.4019,
                1: 0.4019,
                2: 0.1608,
                3: 0.0322,
                4: 0.0032,
                5: 0.0001
            },
            anySuccess: 0.5981,
            failure: 0.4019,
            expectedValue: 0.8333333333333335
        }
    },
    // one food on two faces
    {
        food: 'Seed', rolls: 1, activationName: '__TEST__', permitReroll: false, expected: {
            distribution: {
                0: 0.6667,
                1: 0.3333
            },
            anySuccess: 0.3333,
            failure: 0.6667,
            expectedValue: 0.3333
        }
    },
    {
        food: 'Seed', rolls: 3, activationName: '__TEST__', permitReroll: true, expected: {
            distribution: {
                0: 0.2830,
                1: 0.4528,
                2: 0.2264,
                3: 0.0377
            },
            anySuccess: 0.7170,
            failure: 0.2830,
            expectedValue: 1.0189
        }
    },
    // two food, each on one face
    {
        food: ['Rodent', 'Fruit'], activationName: '__TEST__', permitReroll: false, rolls: 1, expected: {
            distribution: {
                0: 0.6667,
                1: 0.3333
            },
            anySuccess: 0.3333,
            failure: 0.6667,
            expectedValue: 0.3333
        }
    },
    {
        food: ['Rodent', 'Fruit'], activationName: '__TEST__', permitReroll: true, rolls: 4, expected: {
            distribution: {
                0: 0.1950,
                1: 0.3963,
                2: 0.2972,
                3: 0.0991,
                4: 0.0124
            },
            anySuccess: 0.8050,
            failure: 0.1950,
            expectedValue: 1.3374613003095976
        }
    },
    // two food, both on two faces (but one is shared)
    {
        food: ['Invertebrate', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 1, expected: {
            distribution: {
                0: 0.5,
                1: 0.5
            },
            anySuccess: 0.5,
            failure: 0.5,
            expectedValue: 0.5
        }
    },
    {
        food: ['Invertebrate', 'Seed'], activationName: '__TEST__', permitReroll: true, rolls: 2, expected: {
            distribution: {
                0: 0.1818,
                1: 0.5455,
                2: 0.2727
            },
            anySuccess: 0.8182,
            failure: 0.1818,
            expectedValue: 1.0909
        }
    },
    {
        food: ['Invertebrate', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 2, expected: {
            distribution: {
                0: 0.25,
                1: 0.5,
                2: 0.25
            },
            anySuccess: 0.75,
            failure: 0.25,
            expectedValue: 1
        }
    },
    // three food, mixute
    {
        food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: false, rolls: 1, expected: {
            distribution: {
                0: 0.3333,
                1: 0.6667
            },
            anySuccess: 0.6667,
            failure: 0.3333,
            expectedValue: 0.6667
        }
    },
    {
        food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: true, rolls: 5, expected: {
            distribution: {
                0: 0.0039,
                1: 0.0412,
                2: 0.1647,
                3: 0.3293,
                4: 0.3293,
                5: 0.1317
            },
            anySuccess: 0.9961,
            failure: 0.0039,
            expectedValue: 3.3342
        }
    },
    {
        food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: false, rolls: 5, expected: {
            distribution: {
                0: 0.0041,
                1: 0.0412,
                2: 0.1646,
                3: 0.3292,
                4: 0.3292,
                5: 0.1317
            },
            anySuccess: 0.9959,
            failure: 0.0041,
            expectedValue: 3.3333
        }
    },
    // four food, mixture allows absolute success
    {
        food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 2, expected: {
            distribution: {
                0: 0.0278,
                1: 0.2778,
                2: 0.6944
            },
            anySuccess: 0.9722,
            failure: 0.0278,
            expectedValue: 1.6667
        }
    },
    {
        food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: true, rolls: 5, expected: {
            distribution: {
                0: 0,
                1: 0.0032,
                2: 0.0322,
                3: 0.1608,
                4: 0.4019,
                5: 0.4019
            },
            anySuccess: 1,
            failure: 0,
            expectedValue: 4.1672
        }
    },
    {
        food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 5, expected: {
            distribution: {
                0: 0.0001,
                1: 0.0032,
                2: 0.0322,
                3: 0.1608,
                4: 0.4019,
                5: 0.4019
            },
            anySuccess: 0.9999,
            failure: 0.0001,
            expectedValue: 4.1667
        }
    }
];

const errorCases: TestCase[] = [
    // expect all these to throw errors (hence dummy expected values)
    { food: 'Fish', rolls: 1, activationName: '__TEST__', permitReroll: true, expected: { distribution: {}, failure: 0, anySuccess: 0, expectedValue: 0 } },
    { food: ['Rodent', 'Fruit'], rolls: 1, activationName: '__TEST__', permitReroll: true, expected: { distribution: {}, failure: 0, anySuccess: 0, expectedValue: 0 } },
];

describe('getDiceBinomialActivationStats', () => {
    it.each(positiveCases)(
        'computes correct stats for $food with $rolls roll(s)',
        ({ activationName, food, rolls, expected, permitReroll }) => {
            const result = getDiceBinomialActivationStats(activationName, allDice.basegame, food, rolls, permitReroll);

            expect(result.failure).toBeCloseTo(expected.failure, 4);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess, 4);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue, 4);

            expect(Object.keys(result.distribution).length === rolls + 1)

            expect(result.failure).toEqual(result.distribution[0]);
            const successDistrubutionSum = Object.keys(result.distribution)
                .filter(k => Number(k) > 0)
                .reduce((acc, k) => acc + result.distribution[Number(k)], 0);
            expect(result.anySuccess).toBeCloseTo(successDistrubutionSum, 4);
            for (let k = 0; k <= rolls; k++) {
                expect(result.distribution[k]).toBeCloseTo(expected.distribution[k], 4);
            }
        }
    );

    it.each(errorCases)(
        'errow thrown when permitRoll is true but rollCount is 1',
        ({ food, rolls, activationName, permitReroll }) => {
            expect(() => {
                getDiceBinomialActivationStats(activationName, allDice.basegame, food, rolls, permitReroll);
            }).toThrow();
        }
    )
});