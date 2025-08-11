import type { Habitats, HabitatInfo } from "../../../types/Habitats";


export function createHabitatInfo(h: Habitats): HabitatInfo {
    const multipleHabitats = Object.values(h).filter(Boolean).length > 1;
    return { ...h, multipleHabitats };
}