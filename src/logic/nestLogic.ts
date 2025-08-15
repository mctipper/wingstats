import type { Nest } from "@customTypes";

export function nestMatchLogic(birdNest: Nest, requiredNest: Nest): boolean {
    if (requiredNest === 'None') return birdNest === 'None';
    if (birdNest === 'Star') return true; // Star matches anything
    return birdNest === requiredNest;
}