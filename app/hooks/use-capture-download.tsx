import { useState } from "react";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const useCaptureDownload = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleCaptureAndDownload = async (
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    setIsDownloading(true);
    const captureNode = ref?.current;

    try {
      if (captureNode) {
        const canvas = await html2canvas(captureNode, {
          scale: 5,
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

  return { isDownloading, handleCaptureAndDownload };
};

export default useCaptureDownload;
