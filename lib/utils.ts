import { type ClassValue, clsx } from "clsx";
import {
  addHours,
  endOfWeek,
  format,
  intervalToDuration,
  isBefore,
  nextSaturday,
  parse,
  startOfWeek,
} from "date-fns";
import { Locale } from "next-intl";
import { twMerge } from "tailwind-merge";

import { capacityColors } from "./constants";

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

export const getPaginationData: (params: {
  limit: number;
  page: number;
  count: number | null;
}) => {
  numOfPage: number;
  next: number | null;
  prev: number | null;
} = ({ limit, page, count }) => {
  const numOfPage = Math.ceil(count! / limit);

  const next = page <= numOfPage - 1 ? page + 1 : null;
  const prev = page > 1 ? page - 1 : null;

  return { next, prev, numOfPage };
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

export function getDatesArray(nextWeek?: boolean) {
  const start = startOfWeek(new Date(), { weekStartsOn: 6 }); //
  const end = endOfWeek(new Date(), { weekStartsOn: 6 });
  const nextWeekStart = nextSaturday(new Date());
  const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 6 });
  const datesArray = nextWeek
    ? getDatesBetween(nextWeekStart, nextWeekEnd)
    : getDatesBetween(start, end);
  return datesArray;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function equal(obj1: Record<string, any>, obj2: Record<string, any>) {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;

    if (!equal(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function formatTime(
  time: string,
  formatStr?: "HH:mm:ss aa" | "HH:mm aa",
) {
  const timeFormat = time.split(":").length === 3 ? "HH:mm:ss" : "HH:mm";
  return format(
    parse(time.split(".")[0], timeFormat, new Date()),
    formatStr ?? "HH:mm",
  );
}

export function differenceBtwTwoTimes(startTime: string, endTime: string) {
  if (!startTime || !endTime) return "0h 00m";

  const timeFormat = (time: string) =>
    time.split(":").length === 3 ? "HH:mm:ss" : "HH:mm";

  const start = parse(startTime, timeFormat(startTime), new Date());
  const end = parse(endTime, timeFormat(endTime), new Date());

  const duration = intervalToDuration({
    start,
    end,
  });

  const formatted = `${duration.hours ?? 0}h ${(duration.minutes ?? 0)
    .toString()
    .padStart(2, "0")}m`;

  return formatted;
}
export const durationToMinutes = (duration: string) => {
  const match = duration.match(/(\d+)h\s+(\d+)m/);

  if (!match) return 0;

  const [, hours, minutes] = match;

  return Number(hours) * 60 + Number(minutes);
};

export const minutesToDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h}h ${m.toString().padStart(2, "0")}m`;
};

export function addDurations(...durations: (string | undefined)[]) {
  const total = durations
    .filter((d) => d != undefined)
    .reduce((sum, d) => sum + durationToMinutes(d), 0);

  return minutesToDuration(total);
}

export function formatRemainingTime(value: string | null) {
  if (!value) return "-";
  const isNegative = value.startsWith("-");

  const cleaned = value.replace("-", "");

  const [daysPart, timePart] = cleaned.includes("days")
    ? cleaned.split("days")
    : ["0", cleaned];

  const days = parseInt(daysPart.trim());

  const [hours, minutes] = timePart.trim().split(":");

  const result = [];

  if (days > 0) {
    result.push(`${days}days`);
  }

  result.push(`${hours}h`);
  result.push(`${minutes}m`);

  return isNegative ? `Expired ${result.join(" ")} ago` : result.join(" ");
}

export function getRemainingTime(appointmentDatetime: string) {
  const start = new Date(appointmentDatetime);

  const end = addHours(start, 1);

  const diff = end.getTime() - Date.now();

  if (diff <= 0) {
    return "00:00:00.000000";
  }

  const totalSeconds = diff / 1000;

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );

  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");

  const microseconds = String(
    Math.floor((totalSeconds % 1) * 1_000_000),
  ).padStart(6, "0");

  return `${hours}:${minutes}:${seconds}.${microseconds}`;
}

export const isExpired = (appointmentDatetime: string) =>
  isBefore(appointmentDatetime, new Date());

export function getCapacityColor(capacity: number) {
  if (capacity <= 30) {
    return capacityColors[0];
  } else if (capacity <= 60) {
    return capacityColors[1];
  } else if (capacity <= 80) {
    return capacityColors[2];
  } else return capacityColors[3];
}
