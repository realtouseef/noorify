export interface Hadith {
  id: number;
  englishNarrator: string;
  hadithEnglish: string;
  hadithUrdu: string;
  hadithNumber: string;
  book: { bookName: string; writerName: string };
  chapter: { chapterEnglish: string; chapterNumber: string };
}
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
