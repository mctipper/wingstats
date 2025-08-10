export type Habitats = {
  forest: boolean;
  grassland: boolean;
  wetland: boolean;
};

export type HabitatInfo = Habitats & {
  multipleHabitats: boolean;
};

export function createHabitatInfo(h: Habitats): HabitatInfo {
  const multipleHabitats = Object.values(h).filter(Boolean).length > 1;
  return { ...h, multipleHabitats };
}