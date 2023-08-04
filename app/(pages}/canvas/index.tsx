"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  Popover,
  PopoverContent,
  PopoverTrigger,
  GradientCard,
  DownloadIcon,
  PickIcon,
  NextIcon,
  CardHeader,
  CardFooter,
  Skeleton,
} from "@/app/components";

import type { Arabic, English } from "@/app/types";
import axios from "axios";
import html2canvas from "html2canvas";

const Canvas: React.FunctionComponent = () => {
  const [color, setColor] = useState<string>(
    "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [arabic, setArabic] = useState<Arabic | null>(null);
  const [english, setEnglish] = useState<English | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);

  const colors = [
    {
      color:
        "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
    },
    {
      color:
        "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
    },
    {
      color:
        "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
    },
    {
      color:
        "linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))",
    },
    {
      color:
        "linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))",
    },
    {
      color:
        "linear-gradient(to right, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))",
    },
  ];

  const randomNumber = Math.floor(Math.random() * 6236) + 1;

  const ARABIC_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${randomNumber}`;
  const ENGLISH_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${randomNumber}/en.sahih`;

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

  useEffect(() => {
    fetchVerse();
  }, []);

  const handleCaptureAndDownload = async () => {
    setIsDownloading(true);
    const captureNode = targetRef?.current;

    try {
      if (captureNode) {
        const canvas = await html2canvas(captureNode, {
          scale: 10,
          useCORS: true,
        });
        const dataUrl = canvas.toDataURL();
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "versify.png";
        a.click();
        setIsDownloading(false);
      }
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  const handleColor = (color: string) => setColor(color);

  return (
    <>
      <div
        className="relative m-auto flex h-auto min-h-[380px] w-[1080px] flex-col rounded-sm"
        style={{ background: `${color}` }}
        ref={targetRef}
      >
        <div className="h-100 absolute inset-0 flex items-center justify-center">
          <Card
            className="mx-auto min-h-[150px] w-auto min-w-[600px] max-w-2xl bg-white font-sans shadow-2xl"
            style={{ perspective: "1000px" }}
          >
            {isLoading ? (
              <div className="mb-6">
                <Skeleton className="mx-auto mb-6 mt-3 h-3 w-40 bg-black/25" />
                <div className="space-y-2">
                  <Skeleton className="mx-5 h-3 w-4/5 bg-black/25" />
                  <Skeleton className="mx-5 h-3 w-3/4 bg-black/25" />
                  <Skeleton className="mx-5 h-3 w-2/3 bg-black/25" />
                </div>
              </div>
            ) : (
              <>
                <CardHeader className="mb-4">
                  {arabic?.surah && (
                    <CardDescription className="text-center text-slate-400">
                      Surah&nbsp;{arabic?.surah?.englishName}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="verse-text text-right text-2xl leading-normal">
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
              </>
            )}
          </Card>
        </div>
      </div>
      <div className="fixed bottom-10 space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <PickIcon width={18} height={18} />
              &nbsp; Pick a Color
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid grid-cols-3 gap-4">
              {colors.map(({ color }) => (
                <GradientCard
                  key={color}
                  color={color}
                  onClick={() => handleColor(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" onClick={fetchVerse} disabled={isLoading}>
          <NextIcon width={18} height={18} />
          &nbsp; Next Verse
        </Button>
        <Button onClick={handleCaptureAndDownload} disabled={isDownloading}>
          <DownloadIcon width={18} height={18} />
          &nbsp; Download
        </Button>
      </div>
    </>
  );
};

export default Canvas;
