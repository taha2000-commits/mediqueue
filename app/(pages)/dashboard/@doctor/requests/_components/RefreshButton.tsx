"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export function RefreshButton({
  variant = "default",
  className = "",
}: {
  variant?: "icon" | "default";
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      size={variant}
      onClick={refresh}
      disabled={isPending}
      className={className}
    >
      <RefreshCw className={`${isPending ? "animate-spin" : ""}`} />

      {variant !== "icon" ? (
        <span className="hidden sm:inline">Refresh</span>
      ) : null}
    </Button>
  );
}
