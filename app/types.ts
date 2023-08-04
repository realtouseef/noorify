export interface Arabic {
  surah: {
    englishName: string;
    name: string;
    number: number;
  };
  text: string;
  numberInSurah: number;
}

export interface English {
  text: string | null;
}

export interface Colors {
  color: string;
}
