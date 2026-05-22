"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  height = "4px",
  color = "red",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  height?: string;
  color?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-muted h- relative flex w-full items-center overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={"bg-primary h-full flex-1 transition-all"}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          height: height,
          backgroundColor: color,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
