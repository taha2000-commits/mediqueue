"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useHandleSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return {
    urlSearchParams: {
      set: (name: string, value: string) => {
        router.push(pathname + "?" + createQueryString(name, value));
      },
      setWithClear: (name: string, value: string) => {
        router.push(pathname + "?" + name + "=" + value);
      },
      delete: (name: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name);
        router.push(pathname + "?" + params.toString());
      },
      clear: () => {
        router.push(pathname);
      },
    },
  };
}
