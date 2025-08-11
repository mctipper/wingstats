export type BonusCards = {
    anatomist: boolean;
    cartographer: boolean;
    historian: boolean;
    photographer: boolean;
    backyardBirder: boolean;
    birdBander: boolean;
    birdCounter: boolean;
    birdFeeder: boolean;
    dietSpecialist: boolean;
    enclosureBuilder: boolean;
    falconer: boolean;
    fisheryManager: boolean;
    foodWebExpert: boolean;
    forester: boolean;
    largeBirdSpecialist: boolean;
    nestBoxBuilder: boolean;
    omnivoreExpert: boolean;
    passerineSpecialist: boolean;
    platformBuilder: boolean;
    prairieManager: boolean;
    rodentologist: boolean;
    viticulturalist: boolean;
    wetlandScientist: boolean;
    wildlifeGardener: boolean;
    caprimulgiformSpecialist: boolean;
    smallClutchSpecialist: boolean;
    endangeredSpeciesProtector: boolean;
}

export type BonusCardInfo = BonusCards & {
    bonusCardCount: number
}