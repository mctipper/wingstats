import { type Food } from "@customTypes";

export type DieFace = Food | Food[];

// strictly 6
export type DieFaces = [DieFace, DieFace, DieFace, DieFace, DieFace, DieFace];

export interface Die {
  dieType: "base" | "oceania";
  readonly faces: DieFaces;
}

export const baseDie: Readonly<Die> = {
  dieType: "base",
  faces: [
    "invertebrate",
    "seed",
    "fish",
    "fruit",
    "rodent",
    ["invertebrate", "seed"],
  ],
};

export const oceaniaDie: Readonly<Die> = {
  dieType: "oceania",
  faces: [
    "invertebrate",
    ["nectar", "seed"],
    "fish",
    ["nectar", "fruit"],
    "rodent",
    ["invertebrate", "seed"],
  ],
};

export const diceList: Readonly<Die>[] = [baseDie, oceaniaDie];
