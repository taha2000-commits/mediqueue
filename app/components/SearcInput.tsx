"use client";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDeferredValue, useEffect, useEffectEvent, useState } from "react";

import { useDirection } from "@/components/ui/direction";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

export default function SearchInput({ count = 0 }: { count?: number }) {
  const t = useTranslations("BookPage");
  const dir = useDirection();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || "",
  );

  const deferredValue = useDeferredValue(searchText);
  const { urlSearchParams } = useHandleSearchParams();
  const event = useEffectEvent(() => {
    urlSearchParams.set("search", deferredValue);
  });
  useEffect(() => event(), [deferredValue]);

  return (
    <InputGroup className="max-w-xs" dir={dir}>
      <InputGroupInput
        placeholder={t("search") + "..."}
        defaultValue={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {count} {t("results")}
      </InputGroupAddon>
    </InputGroup>
  );
}
