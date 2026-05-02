"use server";

import { headers } from "next/headers";

import { getLocale } from "@/i18n/get-locale";

import { paramsToSearchParams } from "../utils";

export async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}
export const fetchData: <T>(params: {
  url: string | URL | Request;
  init?: RequestInit | undefined;
  params?: Record<string, string | string[] | undefined>;
}) => Promise<T> = async ({ url, init = {}, params = {} }) => {
  const baseUrl = await getBaseUrl();

  const paramsAsString = paramsToSearchParams({
    ...params,
    lang: await getLocale(),
  });

  return await fetch(`${baseUrl}/api${url}?${paramsAsString}`, init).then(
    (res) => res.json(),
  );
};
