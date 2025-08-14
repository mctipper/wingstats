import { birdsWithRollAnyXDice, getRollAnyXDiceBirdActivations } from "@logic/diceActivations/rollAnyXDie";

export function debug(): any {
    debugger;

    const result = getRollAnyXDiceBirdActivations(birdsWithRollAnyXDice);

    debugger;

    return result;
}