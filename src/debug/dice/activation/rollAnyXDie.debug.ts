import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivation } from "@logic/diceActivations/rollAnyXDie";

export function debug(): any {
    debugger;

    const result = getRollAnyXDiceBirdActivation(birdsWithRollAnyXDice);

    debugger;

    return result;
}