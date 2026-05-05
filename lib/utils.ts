import { type ClassValue, clsx } from "clsx";
import { endOfWeek, format, nextSaturday, startOfWeek } from "date-fns";
import { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paramsToSearchParams: (
  params: Record<string, string | string[] | undefined>,
) => string = (params) => {
  const urlSearchParams = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v)) as Record<
      string,
      string
    >,
  );
  return urlSearchParams.toString();
};

export function getTranslatedObj<T>(obj: object, lang: Locale = "en"): T {
  const langSubString = `_${lang}`;

  const x = Object.entries(obj)
    .filter(([k]) => !k.endsWith(lang == "ar" ? "_en" : "_ar"))
    .map(([k, v]) => {
      if (!k.includes(langSubString)) return [k, v];
      else {
        const x = k.replace(langSubString, "");
        return [x, v];
      }
    });

  return Object.fromEntries(x);
}

export function getDatesBetween(start: Date, end: Date) {
  const dates: Date[] = [];
  const current = new Date(format(start, "yyyy-MM-dd"));

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function getDatesArray(nextWeek: boolean) {
  const start = startOfWeek(new Date(), { weekStartsOn: 6 }); //
  const end = endOfWeek(new Date(), { weekStartsOn: 6 });
  const nextWeekStart = nextSaturday(new Date());
  const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 6 });
  const datesArray = nextWeek
    ? getDatesBetween(nextWeekStart, nextWeekEnd)
    : getDatesBetween(start, end);
  return datesArray;
}
