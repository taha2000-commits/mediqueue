"use client";

import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

type SortButtonProps = { param: string; onSort?: () => void };

const SortButton = ({ param, onSort }: SortButtonProps) => {
  const sp = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();
  const [isPending, startTransition] = useTransition();

  const [sortVal, order] = sp.get("sort")?.split(".") ?? [];

  const set_order = !order || order == "desc" ? "asc" : "desc";

  if (isPending) return <Spinner size={14} />;
  return (
    <ChevronDown
      size={14}
      onClick={() => {
        startTransition(() => {
          urlSearchParams.set("sort", `${param}.${set_order}`);
        });
        onSort?.();
      }}
      className={cn(
        "cursor-pointer transition-all duration-1000",
        order == "asc" && sortVal == param ? "rotate-180" : "",
      )}
    />
  );
};

export default SortButton;
