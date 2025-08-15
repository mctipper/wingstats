import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { getDrawOddsByDeck } from '@logic/drawCardLogic';
import type { BirdCard, BirdDeckCollection } from '@customTypes';
import * as targetMatches from '@logic/drawCardActivations/helpers/targetMatches';

const mockAbbottsBooby: BirdCard = {
    id: 263,
    commonName: "Abbott's Booby",
    scientificName: "Papasula abbotti",
    expansion: "Oceania",
    color: "White",
    powerCategory: null,
    powerText: "Draw 3 bonus cards, then discard 2. You may discard bonus cards you did not draw this turn.",
    predator: false,
    flocking: false,
    bonusCard: true,
    victoryPoints: 5,
    nestType: "Platform",
    eggCapacity: 1,
    wingspan: 190,
    habitats: {
        Forest: false,
        Grassland: false,
        habitatCount: 1,
        multipleHabitats: false,
        Wetland: true,
    },
    food: {
        Invertebrate: false,
        Seed: false,
        Fish: true,
        Fruit: false,
        Rodent: false,
        Nectar: false,
        foodDetail: {
            invertebrate: 0,
            seed: 0,
            fish: 2,
            fruit: 0,
            rodent: 0,
            nectar: 0,
            wildFood: 0,
            slashFoodCost: false,
            starFoodCost: false,
            totalFoodCost: 2,
        }
    },
    bonusCards: {
        anatomist: false,
        cartographer: false,
        historian: true,
        photographer: false,
        backyardBirder: false,
        birdBander: false,
        birdCounter: false,
        birdFeeder: false,
        bonusCardCount: 7,
        dietSpecialist: false,
        enclosureBuilder: false,
        falconer: false,
        fisheryManager: true,
        foodWebExpert: false,
        forester: false,
        largeBirdSpecialist: true,
        nestBoxBuilder: false,
        omnivoreExpert: false,
        passerineSpecialist: false,
        platformBuilder: true,
        prairieManager: false,
        rodentologist: false,
        viticulturalist: false,
        wetlandScientist: true,
        wildlifeGardener: false,
        caprimulgiformSpecialist: false,
        smallClutchSpecialist: true,
        endangeredSpeciesProtector: true,
    },
    beakPointing: {
        both: false,
        left: true,
        neither: false,
        right: false
    },
    note: "This temporarily adds 3 bonus cards to your hand of bonus cards, then from that hand you discard any 2 bonus cards.",
    rulings: [],
    additionalRulings: [
        {
            text: "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
            source: "https://www.stonemaiergames.com/games/wingspan/rules/#comment-37710",
        },
    ]
}

const birdDeckCollection: BirdDeckCollection = {
    BaseGame: { expansion: 'BaseGame', cards: [mockAbbottsBooby] },
    European: { expansion: 'European', cards: [mockAbbottsBooby] },
    Oceania: { expansion: 'Oceania', cards: [mockAbbottsBooby] },
    Asia: { expansion: 'Asia', cards: [mockAbbottsBooby] },
};



describe('getDrawOddsByDeck matcher delegation', () => {
    let habitatSpy: MockInstance<typeof targetMatches.matchHabitat>;
    let foodSpy: MockInstance<typeof targetMatches.matchFood>;
    let nestSpy: MockInstance<typeof targetMatches.matchNest>;
    let wingspanSpy: MockInstance<typeof targetMatches.matchWingspan>;
    let predatorSpy: MockInstance<typeof targetMatches.matchPredator>;

    beforeEach(() => {
        habitatSpy = vi.spyOn(targetMatches, 'matchHabitat');
        foodSpy = vi.spyOn(targetMatches, 'matchFood');
        nestSpy = vi.spyOn(targetMatches, 'matchNest');
        wingspanSpy = vi.spyOn(targetMatches, 'matchWingspan');
        predatorSpy = vi.spyOn(targetMatches, 'matchPredator');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('calls matchHabitat when targetType is Habitat', () => {
        getDrawOddsByDeck('Habitat', 'Wetland', birdDeckCollection, 1);
        expect(habitatSpy).toHaveBeenCalledTimes(4);
        expect(foodSpy).not.toHaveBeenCalled();
        expect(nestSpy).not.toHaveBeenCalled();
        expect(wingspanSpy).not.toHaveBeenCalled();
        expect(predatorSpy).not.toHaveBeenCalled();
    });

    it('calls matchFood when targetType is Food', () => {
        getDrawOddsByDeck('Food', 'Fish', birdDeckCollection, 1);
        expect(foodSpy).toHaveBeenCalledTimes(4);
        expect(habitatSpy).not.toHaveBeenCalled();
        expect(nestSpy).not.toHaveBeenCalled();
        expect(wingspanSpy).not.toHaveBeenCalled();
        expect(predatorSpy).not.toHaveBeenCalled();
    });

    it('calls matchNest when targetType is Nest', () => {
        getDrawOddsByDeck('Nest', 'Bowl', birdDeckCollection, 1);
        expect(nestSpy).toHaveBeenCalledTimes(4);
        expect(habitatSpy).not.toHaveBeenCalled();
        expect(foodSpy).not.toHaveBeenCalled();
        expect(wingspanSpy).not.toHaveBeenCalled();
        expect(predatorSpy).not.toHaveBeenCalled();
    });

    it('calls matchWingspan when targetType is Wingspan', () => {
        getDrawOddsByDeck('Wingspan', { op: '>', value: 40 }, birdDeckCollection, 1);
        expect(wingspanSpy).toHaveBeenCalledTimes(4);
        expect(habitatSpy).not.toHaveBeenCalled();
        expect(foodSpy).not.toHaveBeenCalled();
        expect(nestSpy).not.toHaveBeenCalled();
        expect(predatorSpy).not.toHaveBeenCalled();
    });

    it('calls matchPredator when targetType is Predator', () => {
        getDrawOddsByDeck('Predator', true, birdDeckCollection, 1);
        expect(predatorSpy).toHaveBeenCalledTimes(4);
        expect(habitatSpy).not.toHaveBeenCalled();
        expect(foodSpy).not.toHaveBeenCalled();
        expect(nestSpy).not.toHaveBeenCalled();
        expect(wingspanSpy).not.toHaveBeenCalled();
    });
});