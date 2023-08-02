export interface Arabic {
  surah: {
    englishName: string;
    name: string;
    number: number;
  };

  text: string;
  number: number;
}

export interface English {
  text: string | null;
}
