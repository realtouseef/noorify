"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CanvasCard,
  FloatingBar,
} from "@/app/components";

import type { Arabic, English } from "@/app/types";
import axios from "axios";
import { DEFAULT_COLOR, colors } from "@/app/lib/constant";
import { Toaster } from "sonner";
import useCaptureDownload from "@/app/hooks/use-capture-download";

const Canvas: React.FunctionComponent = () => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arabic, setArabic] = useState<Arabic | null>(null);
  const [english, setEnglish] = useState<English | null>(null);
  const targetRef = useRef(null);

  const { handleCaptureAndDownload, isDownloading } = useCaptureDownload();

  const RANDOM_NUMBER = Math.floor(Math.random() * 6236) + 1;
  const ARABIC_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${RANDOM_NUMBER}`;
  const ENGLISH_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${RANDOM_NUMBER}/en.sahih`;

  const fetchVerse = async () => {
    setIsLoading(true);
    try {
      const [arabicResponse, englishResponse] = await Promise.all([
        axios.get(ARABIC_URL),
        axios.get(ENGLISH_URL),
      ]);
      setArabic(arabicResponse.data.data);
      setEnglish(englishResponse.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleColor = (color: string) => setColor(color);

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" expand={false} />
      <CanvasCard color={color} isLoading={isLoading} ref={targetRef}>
        <CardHeader className="mb-4">
          {arabic?.surah && (
            <CardDescription className="text-center text-slate-400">
              Surah&nbsp;{arabic?.surah?.englishName}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription className="verse-text text-2xl leading-normal">
            {arabic?.text}
          </CardDescription>
          <CardDescription>{english?.text}</CardDescription>
        </CardContent>
        <CardFooter>
          {arabic?.surah && (
            <CardDescription className="text-xs text-slate-400">
              Reference {arabic?.surah?.number}:{arabic?.numberInSurah}
            </CardDescription>
          )}
        </CardFooter>
      </CanvasCard>
      <FloatingBar
        colors={colors}
        handleColor={handleColor}
        isLoading={isLoading}
        isDownloading={isDownloading}
        handleDownload={() => handleCaptureAndDownload(targetRef)}
        fetchVerse={fetchVerse}
      />
    </>
  );
};

export default Canvas;
