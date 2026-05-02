"use client";
import { format, setDay } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
function DayCell({ day }: { day: number }) {
  const lang = useLocale();

  return (
    <div className="bg-primary col-span-2 row-span-2 flex items-center justify-center text-white">
      {format(setDay(new Date(), day), "eeee", {
        locale: lang === "ar" ? ar : enUS,
      })}
    </div>
  );
}
export default DayCell;
