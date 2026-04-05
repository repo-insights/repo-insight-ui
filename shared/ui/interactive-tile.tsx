"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

type InteractiveTileProps = React.HTMLAttributes<HTMLDivElement>;

export const InteractiveTile = React.forwardRef<HTMLDivElement, InteractiveTileProps>(
  ({ className, onPointerMove, onPointerLeave, style, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      event.currentTarget.style.setProperty("--glow-x", `${x}px`);
      event.currentTarget.style.setProperty("--glow-y", `${y}px`);
      onPointerMove?.(event);
    };

    const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.style.setProperty("--glow-x", "50%");
      event.currentTarget.style.setProperty("--glow-y", "50%");
      onPointerLeave?.(event);
    };

    return (
      <div
        ref={innerRef}
        className={cn("interactive-tile", className)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          {
            "--glow-x": "50%",
            "--glow-y": "50%",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);

InteractiveTile.displayName = "InteractiveTile";
