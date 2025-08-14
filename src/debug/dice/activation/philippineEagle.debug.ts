import { birdsPhilippineEagle, getPhilippineEagleActivation } from '@logic/diceActivations/philippineEagle'


export function debug() {
    debugger;

    const results = getPhilippineEagleActivation(birdsPhilippineEagle);

    debugger;

    return results
}