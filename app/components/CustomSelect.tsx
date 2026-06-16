"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  text: string;
};

interface CustomSelectProps {
  name?: string;
  placeholder: string;

  className?: string;

  defaultValue?: string;

  options: Option[];

  onValueChange?(value: string): void;

  use_search_params?: {
    param: string;
  };
}

export default function CustomSelect({
  name,
  placeholder,
  className,
  options,
  defaultValue = "",
  onValueChange,
  use_search_params,
}: CustomSelectProps) {
  const searchParams = useSearchParams();

  const { urlSearchParams } = useHandleSearchParams();

  const [isPending, startTransition] = useTransition();
  const value = useMemo(() => {
    if (!use_search_params) {
      return defaultValue;
    }

    return searchParams.get(use_search_params.param) ?? "";
  }, [defaultValue, searchParams, use_search_params]);

  const handleChange = (value: string) => {
    startTransition(() => {
      if (use_search_params?.param) {
        urlSearchParams.set(use_search_params.param, value);
      }
    });
    onValueChange?.(value);
  };

  return (
    <Select name={name} value={value} onValueChange={handleChange}>
      <SelectTrigger
        className={cn("border-ring w-full border capitalize", className)}
      >
        <SelectValue placeholder={isPending ? <Spinner /> : placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="capitalize"
          >
            {option.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
