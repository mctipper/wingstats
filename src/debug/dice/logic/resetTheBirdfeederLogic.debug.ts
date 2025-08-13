import { resetTheBirdfeederLogic } from '@logic/diceActivations/resetTheBirdfeederLogic';
import { baseGameDie } from '@definitions/diceDefinitions';
import type { ActivationStats } from '@customTypes';


export function debug(): any {
    debugger;

    const blackNoddy: ActivationStats = resetTheBirdfeederLogic(
        baseGameDie,
        'Fish',
        'binomial'
    );

    const europeanBeeEater: ActivationStats = resetTheBirdfeederLogic(
        baseGameDie,
        'Invertebrate',
        'binary'
    )

    const europeanHoneyBuzzard: ActivationStats = resetTheBirdfeederLogic(
        baseGameDie,
        'Invertebrate',
        'binomial'
    )

    const laughingKookaburra: ActivationStats = resetTheBirdfeederLogic(
        baseGameDie,
        ['Fish', 'Invertebrate', 'Rodent'],
        'binary'
    )

    debugger;

    return {
        'blackNoddy': blackNoddy,
        'europeanBeeEater': europeanBeeEater,
        'europeanHoneyBuzzard': europeanHoneyBuzzard,
        'laughingKookaburra': laughingKookaburra
    }
}
