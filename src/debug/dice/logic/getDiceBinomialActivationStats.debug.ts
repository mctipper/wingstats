import { getDiceBinomialActivationStats } from "@logic/diceActivations/helpers";
import type { DiceActivations, Food } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";


export function debug(): any {
    type DebugInputCase = {
        input: {
            activationName: DiceActivations,
            food: Food | Food[];
            dieCount: number,
            rollCount: number;
            permitReroll: boolean;
        }
    };
    type DebugOutputCase = DebugInputCase & {
        result: {
            distribution: Record<number, number>;
            failure: number;
            anySuccess: number;
            expectedValue: number;
        }
    };


    const outputs: DebugOutputCase[] = []

    const cases: DebugInputCase[] = [
        // one food on one face
        { input: { food: 'Fish', dieCount: 1, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: 'Fish', dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        { input: { food: 'Fish', dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        // one food on two faces
        { input: { food: 'Seed', dieCount: 1, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: 'Seed', dieCount: 3, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        // two food, each on one face
        { input: { food: ['Rodent', 'Fruit'], dieCount: 1, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: ['Rodent', 'Fruit'], dieCount: 4, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        // two food, both on two faces (but one is shared)
        { input: { food: ['Invertebrate', 'Seed'], dieCount: 1, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: ['Invertebrate', 'Seed'], dieCount: 2, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        // three food, mixute
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], dieCount: 1, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        // four food, mixture allows absolute success
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], dieCount: 2, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: true } },
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], dieCount: 5, rollCount: 1, activationName: '__TEST__', permitReroll: false } },
    ];

    debugger;

    for (const _case of cases) {
        const result = getDiceBinomialActivationStats(_case.input.activationName, baseGameDie, _case.input.food, _case.input.dieCount, _case.input.permitReroll)
        let output: DebugOutputCase = {
            input: {
                activationName: _case.input.activationName,
                food: _case.input.food,
                dieCount: _case.input.dieCount,
                rollCount: _case.input.rollCount,
                permitReroll: _case.input.permitReroll
            },
            result: result
        }
        outputs.push(output)
    }

    debugger;

    return outputs
}