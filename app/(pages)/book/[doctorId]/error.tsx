"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Button from "@/app/components/Button";

const Error = () => {
  const t = useTranslations("BookPage");
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="">{t("noSchedule")}</p>
      <Button
        className="text-xs"
        onClick={() => {
          router.back();
        }}
      >
        {t("chooseAnotherDoctor")}
      </Button>
    </div>
  );
};

export default Error;
