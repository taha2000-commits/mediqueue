"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button onClick={refresh} disabled={isPending}>
      <RefreshCw className={`mr-2 size-4 ${isPending ? "animate-spin" : ""}`} />

      {isPending ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
