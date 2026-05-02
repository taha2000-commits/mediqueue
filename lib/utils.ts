import { type ClassValue, clsx } from "clsx";
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

export function getTranslatedObj(obj: object, lang: Locale = "en") {
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
