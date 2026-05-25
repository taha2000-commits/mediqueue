"use client";

import { Loader2, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from "react";

import { useDirection } from "@/components/ui/direction";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  count?: number;
  className?: string;
  placeholder?: string;
};

export default function SearchInput({
  count = 0,
  className,
  placeholder,
}: SearchInputProps) {
  const t = useTranslations("BookPage");
  const dir = useDirection();

  const searchParams = useSearchParams();

  const initialValue = useMemo(
    () => searchParams.get("search") ?? "",
    [searchParams],
  );

  const [search, setSearch] = useState(initialValue);

  const deferredSearch = useDeferredValue(search);

  const isSearching = search !== deferredSearch;

  const { urlSearchParams } = useHandleSearchParams();

  const event = useEffectEvent(() => {
    urlSearchParams.set("search", deferredSearch);
  });
  useEffect(() => event(), [deferredSearch]);

  return (
    <InputGroup dir={dir} className={cn("max-w-xs", className)}>
      <InputGroupInput
        value={search}
        placeholder={placeholder ?? `${t("search")}...`}
        onChange={(e) => {
          if (e.target.value == "") urlSearchParams.delete("search");
          setSearch(e.target.value);
        }}
      />

      <InputGroupAddon>
        {isSearching ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Search className="size-4" />
        )}
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        {count} {t("results")}
      </InputGroupAddon>
    </InputGroup>
  );
}
