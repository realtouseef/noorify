"use client";

import React, { useRef, useState } from "react";
import {
  CanvasCard,
  CardContent,
  CardDescription,
  FloatingBar,
} from "@/app/components";
import { DEFAULT_COLOR, colors } from "@/app/lib/constant";
import { HADITH_DATA } from "@/app/lib/hadith-data";
import useCaptureDownload from "@/app/hooks/use-capture-download";
import { Toaster } from "sonner";
import { Hadith } from "../types";

const Hadiths = () => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredHadith, setFilteredHadith] = useState<Hadith>(HADITH_DATA[0]);

  const ref = useRef<HTMLDivElement>(null);
  const { handleCaptureAndDownload, isDownloading } = useCaptureDownload();

  const fetchHaidth = () => {
    setIsLoading(true);
    const RANDOM_NUMBER = Math.floor(Math.random() * 41) + 1;
    HADITH_DATA.filter((hadith) => {
      if (hadith.id === RANDOM_NUMBER) {
        setFilteredHadith(hadith);
      }
    });
    setIsLoading(false);
  };

  const handleColor = (color: string): void => setColor(color);

  return (
    <>
      <Toaster richColors position="top-center" expand={false} />
      <div className="my-auto flex h-screen max-w-5xl flex-col">
        <CanvasCard
          color={color}
          key={filteredHadith.id}
          maxWidthCard="max-w-4xl"
          className="min-h-max"
          ref={ref}
        >
          <h4 className="mx-auto max-w-2xl px-6 py-5 text-center text-lg text-gray-400">
            {filteredHadith.englishNarrator.split(":").join("")}
          </h4>
          <CardContent className="max-w-3xl space-y-5 px-8 py-4">
            <CardDescription className="verse-text leading-[1.4]">
              {filteredHadith.hadithUrdu}
            </CardDescription>
            <CardDescription className="px-3 py-4 text-xl leading-relaxed">
              {filteredHadith.hadithEnglish}
            </CardDescription>
            <CardDescription className="px-3 py-4 text-sm leading-relaxed">
              [{filteredHadith.book.bookName}&nbsp;
              {filteredHadith.chapter.chapterNumber}:
              {filteredHadith.hadithNumber}]
            </CardDescription>
          </CardContent>
        </CanvasCard>
      </div>
      <FloatingBar
        colors={colors}
        handleColor={handleColor}
        isLoading={isLoading}
        isDownloading={isDownloading}
        fetchVerse={fetchHaidth}
        handleDownload={() => handleCaptureAndDownload(ref)}
      />
    </>
  );
};

export default Hadiths;
