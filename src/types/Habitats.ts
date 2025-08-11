export type Habitats = {
  forest: boolean;
  grassland: boolean;
  wetland: boolean;
};

export type HabitatInfo = Habitats & {
  habitatCount: number;
  multipleHabitats: boolean;
};
