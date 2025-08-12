import { describe, it, expect } from 'vitest';
import { allDice } from '@data/diceDefinitions';
import type { Food } from '@customTypes';
import { getDiceBinomialActivationStats } from '../getDiceBinomialActivationStats';

type TestCase = {
    food: Food | Food[];
    rolls: number;
    expected: {
        distribution: Record<number, number>
        failure: number;
        anySuccess: number;
        expectedValue: number;
    };
};

const cases: TestCase[] = [
    {
        food: "Fish",
        rolls: 1,
        expected: {
            distribution: {
                0: 0.8334,
                1: 0.1667
            },
            anySuccess: 0.1667,
            failure: 0.8334,
            expectedValue: 0.1667
        }
    },
    {
        food: "Fish",
        rolls: 5,
        expected: {
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
            expectedValue: 0.8334
        }
    },
    {
        food: "Rodent",
        rolls: 1,
        expected: {
            distribution: {
                0: 0.8334,
                1: 0.1667
            },
            anySuccess: 0.1667,
            failure: 0.8334,
            expectedValue: 0.1667
        }
    },
    {
        food: "Rodent",
        rolls: 5,
        expected: {
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
            expectedValue: 0.8334
        }
    },
    {
        food: "Fruit",
        rolls: 1,
        expected: {
            distribution: {
                0: 0.8334,
                1: 0.1667
            },
            anySuccess: 0.1667,
            failure: 0.8334,
            expectedValue: 0.1667
        }
    },
    {
        food: "Fruit",
        rolls: 5,
        expected: {
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
            expectedValue: 0.8334
        }
    },
    {
        food: "Seed",
        rolls: 1,
        expected: {
            distribution: {
                0: 0.6667,
                1: 0.3334
            },
            anySuccess: 0.3334,
            failure: 0.6667,
            expectedValue: 0.3334
        }
    },
    {
        food: "Seed",
        rolls: 3,
        expected: {
            distribution: {
                0: 0.2963,
                1: 0.4444,
                2: 0.2222,
                3: 0.0370
            },
            anySuccess: 0.7037,
            failure: 0.2963,
            expectedValue: 1
        }
    },
    {
        food: [
            "Rodent",
            "Fruit"
        ],
        rolls: 1,
        expected: {
            distribution: {
                0: 0.6667,
                1: 0.3334
            },
            anySuccess: 0.3334,
            failure: 0.6667,
            expectedValue: 0.3334
        }
    },
    {
        food: [
            "Rodent",
            "Fruit"
        ],
        rolls: 4,
        expected: {
            distribution: {
                0: 0.1975,
                1: 0.3951,
                2: 0.2963,
                3: 0.0988,
                4: 0.0123
            },
            anySuccess: 0.8025,
            failure: 0.1975,
            expectedValue: 1.3334
        }
    },
    {
        food: [
            "Invertebrate",
            "Seed"
        ],
        rolls: 1,
        expected: {
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
        food: [
            "Invertebrate",
            "Seed"
        ],
        rolls: 2,
        expected: {
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
    {
        food: [
            "Rodent",
            "Fruit",
            "Fish",
            "Seed"
        ],
        rolls: 1,
        expected: {
            distribution: {
                0: 0.1667,
                1: 0.8334
            },
            anySuccess: 0.8334,
            failure: 0.1667,
            expectedValue: 0.8334
        }
    },
    {
        food: [
            "Rodent",
            "Fruit",
            "Fish",
            "Seed"
        ],
        rolls: 5,
        expected: {
            distribution: {
                0: 0.0001,
                1: 0.0032,
                2: 0.0322,
                3: 0.1607,
                4: 0.4019,
                5: 0.4019
            },
            anySuccess: 0.9999,
            failure: 0.0001,
            expectedValue: 4.1667
        }
    }
]

describe('getDiceBinaryActivationStats', () => {
    it.each(cases)(
        'computes correct stats for $food with $rolls roll(s)',
        ({ food, rolls, expected }) => {
            const result = getDiceBinomialActivationStats(allDice.basegame, food, rolls);

            expect(result.failure).toBeCloseTo(expected.failure);
            expect(result.anySuccess).toBeCloseTo(expected.anySuccess);
            expect(result.expectedValue).toBeCloseTo(expected.expectedValue);

            expect(Object.keys(result.distribution).length === rolls + 1)

            expect(result.failure).toEqual(result.distribution[0]);
            const successDistrubutionSum = Object.keys(result.distribution)
                .filter(k => Number(k) > 0)
                .reduce((acc, k) => acc + result.distribution[Number(k)], 0);
            expect(result.anySuccess).toBeCloseTo(successDistrubutionSum);
            for (let k = 0; k <= rolls; k++) {
                expect(result.distribution[k]).toBeCloseTo(expected.distribution[k]);
            }
        }
    )
});