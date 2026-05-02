"use client";
import { useTranslations } from "next-intl";

import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

import Button from "./Button";

const ClearSearchParamsBtn = () => {
  const t = useTranslations("BookPage");
  const { urlSearchParams } = useHandleSearchParams();
  return (
    <Button
      onClick={() => {
        urlSearchParams.clear();
      }}
    >
      {t("clearFilters")}
    </Button>
  );
};

export default ClearSearchParamsBtn;
