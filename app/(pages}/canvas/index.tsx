"use client";

import React, { useState } from "react";
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
} from "@/app/components";

const Canvas: React.FunctionComponent = () => {
  const [color, setColor] = useState<string>(
    "linear-gradient(to right, rgb(249, 168, 212), rgb(216, 180, 254), rgb(129, 140, 248))",
  );
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
          <Card className="mx-auto w-80 max-w-2xl bg-white">
            <CardContent>
              <CardDescription>
                ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ٢
              </CardDescription>
            </CardContent>
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
        <Button variant="outline">
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
