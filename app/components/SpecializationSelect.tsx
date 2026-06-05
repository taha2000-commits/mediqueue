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
import { cn } from "@/lib/utils";

const SpecializationSelect = ({
  defaultValue,
  use_search_params = true,
  lang = "en",
  disabled = false,
  onChange = () => {},
  className = "",
  options,
  name = "specialization",
}: {
  name?: string;
  defaultValue?: string;
  use_search_params?: boolean;
  lang?: "ar" | "en";
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  options?: { text: string; value: string; count: number }[];
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

  const specializationsParam =
    searchParams.get("specialization") || dVal || undefined;

  const selectOpts =
    options ??
    specializations.map((sp) => ({
      text: sp[dir == "rtl" || lang == "ar" ? "ar" : "en"],
      value: sp[dir == "rtl" || lang == "ar" ? "ar" : "en"],
      count: 0,
    }));

  return (
    <Select
      defaultValue={use_search_params ? specializationsParam : dVal}
      onValueChange={(val) => {
        if (use_search_params) urlSearchParams.set("specialization", val);
        onChange(val);
      }}
      dir={dir}
      name={name}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full max-w-64", className)}>
        <SelectValue placeholder={t("specialization")} />
      </SelectTrigger>
      <SelectContent>
        {selectOpts.map((opt, i) => (
          <SelectItem
            key={i}
            value={opt.value}
            className="flex items-center justify-between"
          >
            <span>{opt.text}</span>
            {opt.count > 0 && (
              <span className="bg-secondary rounded-md px-2">{opt.count}</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default SpecializationSelect;
