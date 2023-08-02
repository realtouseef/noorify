"use client";

import React, { useEffect, useState } from "react";
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

const Canvas: React.FunctionComponent = () => {
  const [color, setColor] = useState<string>(
    "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [arabic, setArabic] = useState<Arabic | null>(null);
  const [english, setEnglish] = useState<English | null>(null);

  const colors = [
    {
      label: "COTTON CANDY",
      color:
        "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
    },
    {
      label: "SUNSET",
      color:
        "linear-gradient(to right, rgb(199, 210, 254), rgb(254, 202, 202), rgb(254, 249, 195))",
    },
    {
      label: "ICE",
      color:
        "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
    },
    {
      label: "PEACHY",
      color:
        "linear-gradient(to right, rgb(254, 202, 202), rgb(252, 165, 165), rgb(254, 240, 138))",
    },
    {
      label: "LAVENDER",
      color:
        "linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252))",
    },
    {
      label: "STRAWBERRY",
      color:
        "linear-gradient(to right, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))",
    },
  ];

  const randomNumberGenerator = Math.floor(Math.random() * 6236) + 1;

  const ARABIC_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${randomNumberGenerator}`;
  const ENGLISH_URL = `${process.env.NEXT_PUBLIC_ENDPOINT}/${randomNumberGenerator}/en.sahih`;

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

  // REFERENCE
  // https://hypercolor.dev/

  const handleColor = (color: string) => setColor(color);

  return (
    <>
      <div
        className="relative flex h-96 w-[45rem] items-center justify-center rounded-md"
        style={{ background: `${color}` }}
      >
        <div className="h-100 absolute inset-0 flex items-center justify-center">
          <Card className="min-h-40 mx-auto w-4/5 bg-white bg-opacity-20 backdrop-blur-md backdrop-brightness-125">
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
                <CardHeader>
                  {arabic?.surah && (
                    <CardDescription className="text-center">
                      {arabic?.surah?.englishName} -- {arabic?.surah?.name}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="font-arabic text-right text-lg">
                    {arabic?.text}
                  </CardDescription>
                  <CardDescription>{english?.text}</CardDescription>
                </CardContent>
                <CardFooter>
                  {arabic?.surah && (
                    <CardDescription>
                      Reference {arabic?.surah?.number}:{arabic?.number}
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
              {colors.map(({ label, color }) => (
                <GradientCard
                  key={label}
                  label={label}
                  color={color}
                  onClick={() => handleColor(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" onClick={fetchVerse}>
          <NextIcon width={18} height={18} />
          &nbsp; Next Verse
        </Button>
        <Button>
          <DownloadIcon width={18} height={18} />
          &nbsp; Download
        </Button>
      </div>
    </>
  );
};

export default Canvas;
