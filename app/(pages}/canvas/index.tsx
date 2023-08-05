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
import { colors } from "@/app/lib/constant";
import { toast, Toaster } from "sonner";

const Canvas: React.FunctionComponent = () => {
  const DEFAULT_COLOR: string =
    "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))";

  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [arabic, setArabic] = useState<Arabic | null>(null);
  const [english, setEnglish] = useState<English | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);

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

  const handleCaptureAndDownload = async () => {
    setIsDownloading(true);
    setIsDownloaded(false);
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
        a.download = "noorify.png";
        a.click();
        setIsDownloading(false);
        toast.success("Downloaded Successfully!");
      }
    } catch (error) {
      console.error("Downloading failed:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleColor = (color: string) => setColor(color);

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" expand={false} />

      <div
        className="min-h-96 m-auto flex w-[1080px] flex-col rounded-sm"
        style={{ background: `${color}` }}
        ref={targetRef}
      >
        <div className="my-auto flex h-auto items-center justify-center  py-20">
          <Card className="mx-auto min-h-max w-auto min-w-[600px] max-w-2xl bg-white shadow-2xl">
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
