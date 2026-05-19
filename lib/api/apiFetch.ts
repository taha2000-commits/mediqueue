import { paramsToSearchParams } from "../utils";

export const apiFetch: <T>(params: {
  url: string | URL | Request;
  init?: RequestInit | undefined;
  params?: Record<string, string | string[] | undefined>;
}) => Promise<T> = async ({ url, init = {}, params = {} }) => {
  const baseUrl = window.location.origin;

  const paramsAsString = paramsToSearchParams({
    ...params,
    lang: "en",
  });

  return await fetch(`${baseUrl}/api${url}?${paramsAsString}`, init).then(
    (res) => res.json(),
  );
};
