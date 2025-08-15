import type {
    HabitatInfo
} from "@customTypes";


export function createHabitatInfo(raw: {
    Forest: boolean;
    Grassland: boolean;
    Wetland: boolean;
}): HabitatInfo {
    const habitatFlags = {
        Forest: raw.Forest,
        Grassland: raw.Grassland,
        Wetland: raw.Wetland,
    };

    const habitatCount = Object.values(habitatFlags).filter(Boolean).length;
    const multipleHabitats = habitatCount > 1;

    return {
        ...habitatFlags,
        habitatCount,
        multipleHabitats,
    };
}
