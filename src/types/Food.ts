export type Food =
    | 'Invertebrate'
    | 'Seed'
    | 'Fish'
    | 'Fruit'
    | 'Rodent'
    | 'Nectar';


export type FoodCost = {
    invertebrate: number,
    seed: number,
    fish: number,
    fruit: number,
    rodent: number,
    nectar: number,
    wildFood: number,
    slashFoodCost: boolean,
    starFoodCost: boolean,
    totalFoodCost: number
}