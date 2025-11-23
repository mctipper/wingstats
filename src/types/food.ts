export const allFoods = [
    "invertebrate",
    "seed",
    "fish",
    "fruit",
    "rodent",
    "nectar",
] as const;

export type Food = typeof allFoods[number];
