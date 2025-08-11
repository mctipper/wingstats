import type { Nest } from "@customTypes";

export function nestMatches(birdNest: Nest, requiredNest: Nest): boolean {
    if (requiredNest === 'None') return birdNest === 'None';
    if (birdNest === 'Star') return true; // Star matches anything
    return birdNest === requiredNest;
}