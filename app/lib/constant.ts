import { Colors } from "../types";

export const colors: Colors[] = [
  {
    color:
      "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
  },
  {
    color:
      "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
  },
  {
    color: "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
  },
  {
    color:
      "linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))",
  },
  {
    color: "linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))",
  },
  {
    color:
      "linear-gradient(to right, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))",
  },
];

const RANDOM_NUMBER = Math.floor(Math.random() * 6236) + 1;
export const ARABIC_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${RANDOM_NUMBER}`;
export const ENGLISH_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${RANDOM_NUMBER}/en.sahih`;
