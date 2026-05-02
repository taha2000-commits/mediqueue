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
      clear: function () {
        router.push(pathname);
      },
      set: function (name: string, value: string) {
        router.push(pathname + "?" + createQueryString(name, value));
      },
    },
  };
}
