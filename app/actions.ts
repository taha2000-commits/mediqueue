"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Locale } from "next-intl";

export const changeLanguage = async (locale: Locale, path: string) => {
  "use server";
  const store = await cookies();
  store.set("locale", locale);
  redirect(path, "replace");
};
