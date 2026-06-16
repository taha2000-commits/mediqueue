"use client";
import { format, getDay } from "date-fns";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn, getDatesArray } from "@/lib/utils";

export default function DaysBar() {
  const { urlSearchParams } = useHandleSearchParams();
  const searchParams = useSearchParams();
  const selected = searchParams.get("day") ?? 0;
  const todayIndx = (getDay(new Date()) + 1) % 7;
  const thisWeek = getDatesArray();

  return (
    <div className="grid grid-cols-7 overflow-hidden">
      {thisWeek.map((day, i) => (
        <Button
          key={i}
          variant={"outline"}
          className={cn(
            "bg-secondary border-tertiary flex cursor-pointer flex-col items-center justify-center gap-1 rounded-none border border-x-0 p-2 py-10 text-xs shadow first:rounded-s-xl first:border-s first:border-e-0 last:rounded-e-xl last:border-s-0 last:border-e sm:text-sm lg:px-3",
            +selected === i &&
              "border-tertiary text-tertiary rounded-t-xl border border-b-0 shadow-none",
            +selected == 0 && "first:rounded-es-none first:border-e",
            +selected == 6 && "last:rounded-ee-none last:border-s",
          )}
          // disabled={isBefore(day, new Date())}
          onClick={() => {
            const index = (getDay(day) + 1) % 7;
            urlSearchParams.set("day", `${index}`);
          }}
        >
          <span className="font-semibold">
            {todayIndx === i ? "today" : format(day, "eee")}
          </span>
          {todayIndx !== i && <span className="">{format(day, "dd MMM")}</span>}
        </Button>
      ))}
    </div>
  );
}
