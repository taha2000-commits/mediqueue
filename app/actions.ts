"use server";

import { cookies } from "next/headers";
import { Locale } from "next-intl";

export const changeLanguage = async (locale: Locale) => {
  "use server";
  const store = await cookies();
  store.set("locale", locale);
};
