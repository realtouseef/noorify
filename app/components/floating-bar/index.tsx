"use client";

import React from "react";
import {
  Button,
  DownloadIcon,
  GradientCard,
  LoaderIcon,
  NextIcon,
  PickIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components";
import { Colors } from "@/app/types";

interface FloatingBarProps {
  colors: Colors[];
  handleColor: (color: string) => void;
  fetchVerse?: () => void;
  isLoading: boolean;
  handleDownload: () => void;
  isDownloading: boolean;
}

const FloatingBar: React.FunctionComponent<FloatingBarProps> = ({
  colors,
  handleColor,
  fetchVerse,
  isLoading,
  handleDownload,
  isDownloading,
}) => {
  return (
    <div className="sticky bottom-10 space-x-4 text-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <PickIcon width={18} height={18} />
            &nbsp; Pick a Color
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid grid-cols-4 gap-4">
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
      <Button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <>
            <LoaderIcon width={18} height={18} />
            &nbsp;Downloading
          </>
        ) : (
          <>
            <DownloadIcon width={18} height={18} />
            &nbsp;Download
          </>
        )}
      </Button>
    </div>
  );
};

export default FloatingBar;
