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

const SpecializationSelect = ({
  defaultValue,
  use_search_params = true,
  lang = "en",
  disabled = false,
  onChange = () => {},
}: {
  defaultValue?: string;
  use_search_params?: boolean;
  lang?: "ar" | "en";
  disabled?: boolean;
  onChange?: (value: string) => void;
}) => {
  const searchParams = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();
  const t = useTranslations("BookPage");
  const dir = useDirection();
  const dVal = defaultValue
    ? specializations.find(
        (sp) =>
          sp["ar"].includes(defaultValue) || sp["en"].includes(defaultValue),
      )?.[lang]
    : undefined;

  const specializationsParam = searchParams.get("sp") || dVal || undefined;

  const selectOpts = specializations
    .map((sp) => sp[dir == "rtl" || lang == "ar" ? "ar" : "en"])
    .sort();

  return (
    <Select
      defaultValue={use_search_params ? specializationsParam : dVal}
      onValueChange={(val) => {
        if (use_search_params) urlSearchParams.set("sp", val);
        onChange(val);
      }}
      dir={dir}
      name="specialization"
      disabled={disabled}
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
