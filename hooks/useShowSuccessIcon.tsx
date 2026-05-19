"use client";
import { Dispatch, useEffect, useState } from "react";

export function useShowSuccessIcon(): {
  isShow: boolean;
  setIsShow: Dispatch<boolean>;
} {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const set = setTimeout(() => {
      setIsShow(false);
    }, 1000);
    return () => {
      clearTimeout(set);
    };
  }, [isShow]);

  return { isShow, setIsShow };
}
