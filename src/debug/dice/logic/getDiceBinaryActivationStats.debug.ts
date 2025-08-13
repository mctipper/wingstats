import { getDiceBinaryActivationStats } from "@logic/diceActivations/helpers";
import type { DiceActivations, Food } from "@customTypes";
import { baseGameDie } from "@definitions/diceDefinitions";


export function debug(): any {
    type DebugInputCase = {
        input: {
            activationName: DiceActivations,
            food: Food | Food[];
            rolls: number;
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
        { input: { food: 'Fish', rolls: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: 'Fish', rolls: 5, activationName: '__TEST__', permitReroll: true } },
        { input: { food: 'Fish', rolls: 5, activationName: '__TEST__', permitReroll: false } },
        // one food on two faces
        { input: { food: 'Seed', rolls: 1, activationName: '__TEST__', permitReroll: false } },
        { input: { food: 'Seed', rolls: 3, activationName: '__TEST__', permitReroll: true } },
        // two food, each on one face
        { input: { food: ['Rodent', 'Fruit'], activationName: '__TEST__', permitReroll: false, rolls: 1 } },
        { input: { food: ['Rodent', 'Fruit'], activationName: '__TEST__', permitReroll: true, rolls: 4 } },
        // two food, both on two faces
        { input: { food: ['Invertebrate', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 1 } },
        { input: { food: ['Invertebrate', 'Seed'], activationName: '__TEST__', permitReroll: true, rolls: 2 } },
        // three food, mixute
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: false, rolls: 1 } },
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: true, rolls: 5 } },
        { input: { food: ['Rodent', 'Fish', 'Invertebrate'], activationName: '__TEST__', permitReroll: false, rolls: 5 } },
        // four food, mixture allows absolute success
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 2 } },
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: true, rolls: 5 } },
        { input: { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], activationName: '__TEST__', permitReroll: false, rolls: 5 } },
    ];

    debugger;

    for (const _case of cases) {
        const result = getDiceBinaryActivationStats(_case.input.activationName, baseGameDie, _case.input.food, _case.input.rolls, _case.input.permitReroll)
        let output: DebugOutputCase = {
            input: {
                activationName: _case.input.activationName,
                food: _case.input.food,
                rolls: _case.input.rolls,
                permitReroll: _case.input.permitReroll
            },
            result: result
        }
        outputs.push(output)
    }

    debugger;

    return outputs
}