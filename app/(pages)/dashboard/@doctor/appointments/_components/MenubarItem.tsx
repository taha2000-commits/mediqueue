"use client";
import { useSearchParams } from "next/navigation";

import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

interface MenubarItemProps {
  count: number;
  countClassName: string;
  innerText: string;
  className?: string;
  selectedClassName?: string;
  name: string | undefined;
}

export default function MenubarItem({
  count,
  countClassName,
  className,
  selectedClassName,
  innerText,
  name,
}: MenubarItemProps) {
  const { urlSearchParams } = useHandleSearchParams();
  const sp = useSearchParams();

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 py-3",
        className,
        sp.get("status") == name && selectedClassName,
      )}
      onClick={() => {
        if (name) urlSearchParams.setWithClear("status", name);
        else urlSearchParams.clear();
      }}
    >
      <span className="">{innerText}</span>
      <div
        className={cn(
          "flex aspect-square w-7 items-center justify-center rounded-full text-xs",
          countClassName,
        )}
      >
        {count}
      </div>
    </button>
  );
}
