import { RollAnyXDice } from '@logic/diceActivations/rollAnyXDie';
import { baseGameDie, oceaniaDie } from '@data/diceDefinitions';
import type { ActivationStats } from '@customTypes';


export function debug(): any {
    const greatCormorant: ActivationStats = RollAnyXDice(
        baseGameDie,
        'Fish',
        2,
        'binary'
    )

    const sriLankaFrogmouth: ActivationStats = RollAnyXDice(
        oceaniaDie,
        'Invertebrate',
        1,
        'binary'
    )

    debugger;

    return { 'greatCormarant': greatCormorant, sriLankaFrogmouth: sriLankaFrogmouth }
}
