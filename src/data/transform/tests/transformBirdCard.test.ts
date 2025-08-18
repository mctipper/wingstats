import { describe, it, expect, expectTypeOf } from 'vitest';
import { transformBirdCard } from '@data/transform/transformBirdCard';
import type {
    BirdCard,
    Expansion,
    Colour,
    Nest,
    HabitatInfo,
    FoodDetail,
    FoodInfo,
    BonusCardInfo,
    BeakPointingInfo
} from '@customTypes';



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
        // check property types (only ones we care about)
        expectTypeOf(result).toEqualTypeOf<BirdCard>();
        expectTypeOf(result.id).toEqualTypeOf<number>();
        expectTypeOf(result.commonName).toEqualTypeOf<string>();
        expectTypeOf(result.expansion).toEqualTypeOf<Expansion>();
        expectTypeOf(result.color).toEqualTypeOf<Colour>();
        expectTypeOf(result.predator).toEqualTypeOf<boolean>();
        expectTypeOf(result.flocking).toEqualTypeOf<boolean>();
        expectTypeOf(result.bonusCard).toEqualTypeOf<boolean>();
        expectTypeOf(result.victoryPoints).toEqualTypeOf<number>();
        expectTypeOf(result.nestType).toEqualTypeOf<Nest>();
        expectTypeOf(result.eggCapacity).toEqualTypeOf<number>();
        expectTypeOf(result.wingspan).toEqualTypeOf<number>();
        expectTypeOf(result.habitats).toEqualTypeOf<HabitatInfo>();
        expectTypeOf(result.food).toEqualTypeOf<FoodInfo>();
        expectTypeOf(result.food.foodDetail).toEqualTypeOf<FoodDetail>();
        expectTypeOf(result.bonusCards).toEqualTypeOf<BonusCardInfo>();
        expectTypeOf(result.beakPointing).toEqualTypeOf<BeakPointingInfo>();

        // other custom types are tested elsewhere as they require helpers 
        expect(result.food).toEqual({
            Invertebrate: expect.any(Boolean),
            Seed: expect.any(Boolean),
            Fish: expect.any(Boolean),
            Fruit: expect.any(Boolean),
            Rodent: expect.any(Boolean),
            Nectar: expect.any(Boolean),
            foodCost: expect.any(Object), // just test exists, structure is next
            foodDetail: expect.any(Object) // just test exists, structure is next
        });

        expect(result.food.foodCost).toEqual({
            Invertebrate: expect.any(Number),
            Seed: expect.any(Number),
            Fish: expect.any(Number),
            Fruit: expect.any(Number),
            Rodent: expect.any(Number),
            Nectar: expect.any(Number),
            wildFood: expect.any(Number),
            totalFoodCost: expect.any(Number),
        })

        expect(result.food.foodDetail).toEqual({
            slashFoodCost: expect.any(Boolean),
            starFoodCost: expect.any(Boolean),
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
                foodCost: {
                    Invertebrate: 0,
                    Seed: 0,
                    Fish: 2,
                    Fruit: 0,
                    Rodent: 0,
                    Nectar: 0,
                    wildFood: 0,
                    totalFoodCost: 2,
                },
                foodDetail: {
                    slashFoodCost: false,
                    starFoodCost: false,
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
            ],
        });
    });
});
