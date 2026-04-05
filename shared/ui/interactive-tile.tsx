"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

type InteractiveTileProps = React.HTMLAttributes<HTMLDivElement>;

export const InteractiveTile = React.forwardRef<HTMLDivElement, InteractiveTileProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("interactive-tile", className)}
      {...props}
    />
  )
);

InteractiveTile.displayName = "InteractiveTile";
