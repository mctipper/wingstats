export type Habitats = {
  forest: boolean;
  grassland: boolean;
  wetland: boolean;
};

export type HabitatInfo = Habitats & {
  multipleHabitats: boolean;
};
