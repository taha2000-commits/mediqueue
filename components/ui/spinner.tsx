import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"svg"> & { size?: string | number | undefined }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      size={size}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
