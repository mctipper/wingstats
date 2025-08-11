import type { Habitats, HabitatInfo } from "@customTypes/Habitats";


export function createHabitatInfo(h: Habitats): HabitatInfo {
    const habitats: Array<boolean> = Object.values(h).filter(Boolean)
    const habitatCount = habitats.length
    const multipleHabitats = habitatCount > 1;
    return { ...h, habitatCount, multipleHabitats };
}