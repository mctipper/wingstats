import { describe, it, expect } from 'vitest';
import { createBonusCardInfo } from '../createBonusCardInfo';
import type { BonusCards, BonusCardInfo } from '@customTypes/BonusCards';

const defaultBonusCards: BonusCards = {
    anatomist: false,
    cartographer: false,
    historian: false,
    photographer: false,
    backyardBirder: false,
    birdBander: false,
    birdCounter: false,
    birdFeeder: false,
    dietSpecialist: false,
    enclosureBuilder: false,
    falconer: false,
    fisheryManager: false,
    foodWebExpert: false,
    forester: false,
    largeBirdSpecialist: false,
    nestBoxBuilder: false,
    omnivoreExpert: false,
    passerineSpecialist: false,
    platformBuilder: false,
    prairieManager: false,
    rodentologist: false,
    viticulturalist: false,
    wetlandScientist: false,
    wildlifeGardener: false,
    caprimulgiformSpecialist: false,
    smallClutchSpecialist: false,
    endangeredSpeciesProtector: false,
};


describe('createBonusCardInfo', () => {
    it('returns bonusCardCount = 0 when all cards are false', () => {
        const input: BonusCards = Object.fromEntries(
            Object.keys(defaultBonusCards).map(key => [key, false])
        ) as BonusCards;

        const result: BonusCardInfo = createBonusCardInfo(input);
        expect(result.bonusCardCount).toBe(0);
    });

    it('returns bonusCardCount = N when N cards are true', () => {
        const input: BonusCards = {
            ...defaultBonusCards,
            anatomist: true,
            cartographer: true,
            falconer: true,
        };

        const result: BonusCardInfo = createBonusCardInfo(input);
        expect(result.bonusCardCount).toBe(3);
    });

    it('returns bonusCardCount = total when all cards are true', () => {
        const input: BonusCards = Object.fromEntries(
            Object.keys(defaultBonusCards).map(key => [key, true])
        ) as BonusCards;

        const result: BonusCardInfo = createBonusCardInfo(input);
        expect(result.bonusCardCount).toBe(Object.keys(defaultBonusCards).length);
    });
});
