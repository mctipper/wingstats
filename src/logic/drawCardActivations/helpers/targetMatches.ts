import type { BirdCard, Nest, Habitat, Food, WingspanOperator } from '@customTypes'


export function matchNest(card: BirdCard, target: Nest | Nest[]): boolean {
    return Array.isArray(target)
        ? target.includes(card.nestType)
        : card.nestType === target;
}

export function matchHabitat(card: BirdCard, target: Habitat | Habitat[]): boolean {
    const targets = Array.isArray(target) ? target : [target];
    return targets.some(h => card.habitats[h] === true);
}

export function matchFood(card: BirdCard, target: Food | Food[]): boolean {
    const targets = Array.isArray(target) ? target : [target];
    return targets.some(food => card.food[food] === true);
}

export function matchWingspan(card: BirdCard, target: WingspanOperator): boolean {
    if (card.wingspan === 0) return true; // flightless bird always match
    const { op, value } = target;
    switch (op) {
        case '<': return card.wingspan < value;
        case '<=': return card.wingspan <= value;
        case '>': return card.wingspan > value;
        case '>=': return card.wingspan >= value;
        default: return false;
    }
}

export function matchPredator(card: BirdCard, target: boolean): boolean {
    // allow both 'matches is a predator' and 'matches is not a predator'
    return card.predator === target;
}