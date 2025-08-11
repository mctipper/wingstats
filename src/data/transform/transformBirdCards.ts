import type { BirdCard } from "@customTypes/BirdCard";
import { convertFlagToBoolean, convertNullToZero } from "./helpers/convert";
import { createBeakPointingInfo, createBonusCardInfo, createHabitatInfo } from "./helpers/create";
import { translateColour, translateExpansion, translateNest, translateWingspan } from "./helpers/translate";


export function transformBirdCard(raw: any): BirdCard {
  return {
    id: raw["id"],
    commonName: raw["Common name"],
    scientificName: raw["Scientific name"],
    expansion: translateExpansion(raw["Expansion"]),
    color: translateColour(raw["Color"]),
    powerCategory: raw["PowerCategory"],
    powerText: raw["Power text"],
    predator: convertFlagToBoolean(raw["Predator"]),
    flocking: convertFlagToBoolean(raw["Flocking"]),
    bonusCard: convertFlagToBoolean(raw["Bonus card"]),
    victoryPoints: convertNullToZero(raw["Victory points"]),
    nestType: translateNest(raw["Nest type"]),
    eggCapacity: convertNullToZero(raw["Egg capacity"]),
    wingspan: translateWingspan(raw["Wingspan"]),
    habitats: createHabitatInfo({
      forest: convertFlagToBoolean(raw["Forest"]),
      grassland: convertFlagToBoolean(raw["Grassland"]),
      wetland: convertFlagToBoolean(raw["Wetland"])
    }),
    foodCost: {
      invertebrate: convertNullToZero(raw["Invertebrate"]),
      seed: convertNullToZero(raw["Seed"]),
      fish: convertNullToZero(raw["Fish"]),
      fruit: convertNullToZero(raw["Fruit"]),
      rodent: convertNullToZero(raw["Rodent"]),
      nectar: convertNullToZero(raw["Nectar"]),
      wildFood: convertNullToZero(raw["Wild (food)"]),
      slashFoodCost: convertFlagToBoolean(raw["/ (food cost)"]),
      starFoodCost: convertFlagToBoolean(raw["* (food cost)"]),
      totalFoodCost: convertNullToZero(raw["Total food cost"]),
    },
    bonusCards: createBonusCardInfo(
      {
        anatomist: convertFlagToBoolean(raw["Anatomist"]),
        cartographer: convertFlagToBoolean(raw["Cartographer"]),
        historian: convertFlagToBoolean(raw["Historian"]),
        photographer: convertFlagToBoolean(raw["Photographer"]),
        backyardBirder: convertFlagToBoolean(raw["Backyard Birder"]),
        birdBander: convertFlagToBoolean(raw["Bird Bander"]),
        birdCounter: convertFlagToBoolean(raw["Bird Counter"]),
        birdFeeder: convertFlagToBoolean(raw["Bird Feeder"]),
        dietSpecialist: convertFlagToBoolean(raw["Diet Specialist"]),
        enclosureBuilder: convertFlagToBoolean(raw["Enclosure Builder"]),
        falconer: convertFlagToBoolean(raw["Falconer"]),
        fisheryManager: convertFlagToBoolean(raw["Fishery Manager"]),
        foodWebExpert: convertFlagToBoolean(raw["Food Web Expert"]),
        forester: convertFlagToBoolean(raw["Forester"]),
        largeBirdSpecialist: convertFlagToBoolean(raw["Large Bird Specialist"]),
        nestBoxBuilder: convertFlagToBoolean(raw["Nest Box Builder"]),
        omnivoreExpert: convertFlagToBoolean(raw["Omnivore Expert"]),
        passerineSpecialist: convertFlagToBoolean(raw["Passerine Specialist"]),
        platformBuilder: convertFlagToBoolean(raw["Platform Builder"]),
        prairieManager: convertFlagToBoolean(raw["Prairie Manager"]),
        rodentologist: convertFlagToBoolean(raw["Rodentologist"]),
        viticulturalist: convertFlagToBoolean(raw["Viticulturalist"]),
        wetlandScientist: convertFlagToBoolean(raw["Wetland Scientist"]),
        wildlifeGardener: convertFlagToBoolean(raw["Wildlife Gardener"]),
        caprimulgiformSpecialist: convertFlagToBoolean(raw["Caprimulgiform Specialist"]),
        smallClutchSpecialist: convertFlagToBoolean(raw["Small Clutch Specialist"]),
        endangeredSpeciesProtector: convertFlagToBoolean(raw["Endangered Species Protector"])
      }
    ),
    beakPointing: createBeakPointingInfo(
      {
        left: convertFlagToBoolean(raw["Beak Pointing Left"]),
        right: convertFlagToBoolean(raw["Beak Pointing Right"]),
      }
    ),
    note: raw["Note"],
    rulings: raw["rulings"],
    additionalRulings: raw["additionalRulings"]
  };
}
