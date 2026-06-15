import Link from "next/link";

import { cn } from "@/lib/utils";

interface MenubarItemProps {
  count: number;
  countClassName: string;
  innerText: string;
  className?: string;
  selectedClassName?: string;
  name: string | undefined;
  selected?: boolean;
}

export default function MenubarItem({
  count,
  countClassName,
  className,
  selectedClassName,
  innerText,
  name,
  selected = false,
}: MenubarItemProps) {
  return (
    <Link
      className={cn(
        "flex flex-1 cursor-pointer items-center justify-center gap-2 py-3",
        className,
        selected && selectedClassName,
      )}
      href={`/dashboard/appointments/${name ?? ""}`}
    >
      <span className="text-nowrap">{innerText}</span>
      <div
        className={cn(
          "flex aspect-square w-7 items-center justify-center rounded-full text-xs",
          countClassName,
        )}
      >
        {count}
      </div>
    </Link>
  );
}
