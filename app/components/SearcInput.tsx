"use client";

import { Loader2, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useDirection } from "@/components/ui/direction";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
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

  const [isPending, startTransition] = useTransition();

  const { urlSearchParams } = useHandleSearchParams();

  const onSearch = () => {
    startTransition(() => urlSearchParams.set("search", search));
  };

  return (
    <div className="flex">
      <InputGroup
        dir={dir}
        className={cn("max-w-xs rounded-r-none", className)}
      >
        <InputGroupInput
          value={search}
          placeholder={placeholder ?? `${t("search")}...`}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <InputGroupAddon>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          <span>
            {count} {t("results")}{" "}
          </span>
        </InputGroupAddon>
      </InputGroup>

      <Button
        className="border-border rounded-s-none border text-sm"
        onClick={onSearch}
      >
        Search {isPending ? <Spinner /> : null}
      </Button>
    </div>
  );
}
