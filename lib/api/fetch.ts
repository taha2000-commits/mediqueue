"use server";

import { getLocale } from "@/i18n/get-locale";

import { paramsToSearchParams } from "../utils";

export const fetchData: <T>(params: {
  url: string | URL | Request;
  init?: RequestInit | undefined;
  params?: Record<string, string | string[] | undefined>;
}) => Promise<T> = async ({ url, init = {}, params = {} }) => {
  const baseUrl = "http://localhost:3000/api";

  const paramsAsString = paramsToSearchParams({
    ...params,
    lang: await getLocale(),
  });

  return await fetch(`${baseUrl}${url}?${paramsAsString}`, init).then((res) =>
    res.json(),
  );
};
