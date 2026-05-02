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
import { specializations } from "@/lib/constants";

const SpecializationSelect = () => {
  const searchParams = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();
  const t = useTranslations("BookPage");
  const dir = useDirection();

  const specializationsParam = searchParams.get("sp") || undefined;

  const selectOpts = specializations
    .map((sp) => sp[dir == "rtl" ? "ar" : "en"])
    .sort();

  return (
    <Select
      defaultValue={specializationsParam}
      onValueChange={(val) => {
        urlSearchParams.set("sp", val);
      }}
      dir={dir}
    >
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder={t("specialization")} />
      </SelectTrigger>
      <SelectContent>
        {selectOpts.map((opt, i) => (
          <SelectItem key={i} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default SpecializationSelect;
