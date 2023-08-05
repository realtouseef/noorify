import React, { forwardRef } from "react";
import { Card, Skeleton } from "@/app/components";
import { cn } from "@/app/lib/utils";

const CanvasCard = forwardRef<
  HTMLDivElement,
  {
    color: string;
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    maxWidthCard?: string;
  }
>(
  (
    {
      color,
      isLoading,
      children,
      className,
      maxWidthCard = "max-w-2xl",
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "min-h-96 m-auto flex w-[1080px] flex-col rounded-sm",
          className,
        )}
        style={{ background: `${color}` }}
        ref={ref}
        {...rest}
      >
        <div className="my-auto flex h-auto items-center justify-center py-20">
          <Card
            className={`mx-auto min-h-max w-auto min-w-[600px] ${maxWidthCard} bg-white shadow-2xl`}
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
              <>{children}</>
            )}
          </Card>
        </div>
      </div>
    );
  },
);

CanvasCard.displayName = "Canvas Card";

export default CanvasCard;
