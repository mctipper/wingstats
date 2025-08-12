import { getDiceBinomialActivationStats } from "@logic/diceActivations/getDiceBinomialActivationStats";
import type { Food } from "@customTypes";
import { baseGameDie } from "@data/diceDefinitions";


export function debug(): any {
    type DebugCase = {
        food: Food | Food[];
        rolls: number;
    };
    type DebugOutputCase = DebugCase & {
        result: {
            distribution: Record<number, number>;
            failure: number;
            anySuccess: number;
            expectedValue: number;
        }
    };

    const outputs: DebugOutputCase[] = []

    const cases: DebugCase[] = [
        // one food on one face
        { food: 'Fish', rolls: 1 },
        { food: 'Fish', rolls: 5 },
        { food: 'Rodent', rolls: 1 },
        { food: 'Rodent', rolls: 5 },
        { food: 'Fruit', rolls: 1 },
        { food: 'Fruit', rolls: 5 },
        // one food on two faces
        { food: 'Seed', rolls: 1 },
        { food: 'Seed', rolls: 3 },
        // two food, each on one face
        { food: ['Rodent', 'Fruit'], rolls: 1 },
        { food: ['Rodent', 'Fruit'], rolls: 4 },
        // two food, both on two faces (but one is shared)
        { food: ['Invertebrate', 'Seed'], rolls: 1 },
        { food: ['Invertebrate', 'Seed'], rolls: 2 },
        // four food, mixture
        { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], rolls: 1 },
        { food: ['Rodent', 'Fruit', 'Fish', 'Seed'], rolls: 5 },
    ];

    debugger;

    for (const _case of cases) {
        const result = getDiceBinomialActivationStats(baseGameDie, _case.food, _case.rolls)
        let output: DebugOutputCase = {
            food: _case.food,
            rolls: _case.rolls,
            result: result
        }
        outputs.push(output)
    }

    debugger;

    return outputs
}