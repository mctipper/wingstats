import { describe, it, expect } from 'vitest';
import { transformBirdCard } from '../transformBirdCard';
import type { BirdCard } from '@customTypes/BirdCard';
import type { Expansions } from '@customTypes/Expansions';
import type { Colour } from '@customTypes/Colour';
import type { Nest } from '@customTypes/Nest';
import type { HabitatInfo } from '@customTypes/Habitats';
import type { FoodCost } from '@customTypes/Food';
import type { BonusCards } from '@customTypes/BonusCards';
import type { BeakPointing } from '@customTypes/BeakPointing';


function assertType<T>(_value: T): void {
    // helper func to assert type (as per name duh)
}

// using a valid bird card as the transform example
const abbottsBooby: any = {
    "id": 263,
    "Common name": "Abbott's Booby",
    "Scientific name": "Papasula abbotti",
    "Expansion": "oceania",
    "Color": "White",
    "PowerCategory": null,
    "Power text": "Draw 3 bonus cards, then discard 2. You may discard bonus cards you did not draw this turn.",
    "Predator": null,
    "Flocking": null,
    "Bonus card": "X",
    "Victory points": 5.0,
    "Nest type": "Platform",
    "Egg capacity": 1.0,
    "Wingspan": "190",
    "Forest": null,
    "Grassland": null,
    "Wetland": "X",
    "Invertebrate": null,
    "Seed": null,
    "Fish": 2.0,
    "Fruit": null,
    "Rodent": null,
    "Nectar": null,
    "Wild (food)": null,
    "\/ (food cost)": null,
    "* (food cost)": null,
    "Total food cost": 2.0,
    "Anatomist": null,
    "Cartographer": null,
    "Historian": "X",
    "Photographer": null,
    "Backyard Birder": null,
    "Bird Bander": null,
    "Bird Counter": null,
    "Bird Feeder": null,
    "Diet Specialist": null,
    "Enclosure Builder": null,
    "Falconer": null,
    "Fishery Manager": "X",
    "Food Web Expert": null,
    "Forester": null,
    "Large Bird Specialist": "X",
    "Nest Box Builder": null,
    "Omnivore Expert": null,
    "Passerine Specialist": null,
    "Platform Builder": "X",
    "Prairie Manager": null,
    "Rodentologist": null,
    "Viticulturalist": null,
    "Wetland Scientist": "X",
    "Wildlife Gardener": null,
    "Caprimulgiform Specialist": null,
    "Small Clutch Specialist": "X",
    "Endangered Species Protector": "X",
    "Beak Pointing Left": "X",
    "Beak Pointing Right": null,
    "Note": "This temporarily adds 3 bonus cards to your hand of bonus cards, then from that hand you discard any 2 bonus cards.",
    "rulings": [

    ],
    "additionalRulings": [
        {
            "text": "Whenever you are entitled to gain resources, you may choose to take some but not all of the quantity specified.",
            "source": "https:\/\/www.stonemaiergames.com\/games\/wingspan\/rules\/#comment-37710"
        }
    ]
};

describe("transformBirdCard", () => {
    it("correctly transforms Abbott's Booby", () => {
        const result = transformBirdCard(abbottsBooby);

        // check type
        assertType<BirdCard>(result)
        // check property types (only ones we care about)
        assertType<number>(result.id);
        assertType<number>(result.id);
        assertType<string>(result.commonName);
        assertType<Expansions>(result.expansion);
        assertType<Colour>(result.color);
        assertType<boolean>(result.predator);
        assertType<boolean>(result.flocking);
        assertType<boolean>(result.bonusCard);
        assertType<number>(result.victoryPoints);
        assertType<Nest>(result.nestType);
        assertType<number>(result.eggCapacity);
        assertType<number>(result.wingspan);
        assertType<HabitatInfo>(result.habitats);
        assertType<FoodCost>(result.foodCost);
        assertType<BonusCards>(result.bonusCards);
        assertType<BeakPointing>(result.beakPointing);

        // other custom types are tested elsewhere as they require helpers 
        expect(result.foodCost).toEqual({
            invertebrate: expect.any(Number),
            seed: expect.any(Number),
            fish: expect.any(Number),
            fruit: expect.any(Number),
            rodent: expect.any(Number),
            nectar: expect.any(Number),
            wildFood: expect.any(Number),
            slashFoodCost: expect.any(Boolean),
            starFoodCost: expect.any(Boolean),
            totalFoodCost: expect.any(Number),
        });

        // check full result
        expect(result).toEqual({
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
                forest: false,
                grassland: false,
                habitatCount: 1,
                multipleHabitats: false,
                wetland: true,
            },
            foodCost: {
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
            ],
        });
    });
});
