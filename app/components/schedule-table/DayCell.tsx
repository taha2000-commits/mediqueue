"use client";
import { format, setDay } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
function DayCell({ day, date }: { day: number; date: Date }) {
  const lang = useLocale();

  return (
    <div className="bg-primary col-span-2 row-span-2 flex flex-col items-center justify-center gap-1 text-white">
      <span className="">
        {format(setDay(new Date(), (day + 6) % 7), "eeee", {
          locale: lang === "ar" ? ar : enUS,
        })}
      </span>
      <span className="text-xs text-muted-foreground">{format(date, "dd-MM-yyyy")}</span>
    </div>
  );
}
export default DayCell;
