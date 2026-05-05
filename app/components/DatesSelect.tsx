"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useDirection } from "@/components/ui/direction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

const datesSelectOptions = ["thisWeek", "nextWeek"];
const DatesSelect = () => {
  const searchParams = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();
  const t = useTranslations("BookPage");
  const dir = useDirection();

  const datesParam = searchParams.get("dates") || undefined;

  return (
    <Select
      defaultValue={datesParam || "thisWeek"}
      onValueChange={(val) => {
        urlSearchParams.set("dates", val);
      }}
      dir={dir}
    >
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder={t("date")} />
      </SelectTrigger>
      <SelectContent>
        {datesSelectOptions.map((opt, i) => (
          <SelectItem key={i} value={opt}>
            {t(opt)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DatesSelect;
