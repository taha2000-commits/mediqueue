"use client";

import { Filter, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";

const EXCLUDED_PARAMS = ["page", "limit"];

const formatLabel = (value: string) => value.replaceAll("_", " ");

const ActiveFiltersPopover = () => {
  const searchParams = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();

  const [clickedID, setClickedID] = useState<string>();
  const [isClearingFilter, startClearingFilter] = useTransition();
  const [isClearingAllFilters, startClearingAllFilters] = useTransition();
  const [open, setOpen] = useState(false);

  const activeFilters = useMemo(
    () =>
      Array.from(searchParams.entries()).filter(
        ([key, value]) => value && !EXCLUDED_PARAMS.includes(key),
      ),
    [searchParams],
  );

  const hasFilters = activeFilters.length > 0;

  const clearFilter = (key: string) => {
    startClearingFilter(() => {
      urlSearchParams.delete(key);
    });
  };

  const clearAllFilters = () => {
    startClearingAllFilters(() => {
      urlSearchParams.clear();
    });
  };

  useEffect(() => {
    const close = () => setOpen(false);
    if (!hasFilters) {
      close();
    }
  }, [hasFilters]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="relative"
          disabled={!hasFilters}
        >
          <div
            className={cn(
              "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white",
              hasFilters ? "bg-red-500" : "bg-muted-foreground",
            )}
          >
            {activeFilters.length}
          </div>

          <Filter />
        </Button>
      </PopoverTrigger>

      {hasFilters && (
        <PopoverContent className="w-fit min-w-sm space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">
              Active Filters ({activeFilters.length})
            </p>

            <Button
              size="xs"
              variant="outline"
              className="border-primary bg-primary text-white"
              onClick={clearAllFilters}
            >
              {isClearingAllFilters ? (
                <Spinner />
              ) : (
                <>
                  <span>Clear All</span>
                  <X />
                </>
              )}
            </Button>
          </div>

          <div className="border-primary bg-primary/20 text-primary flex flex-wrap items-center gap-3 rounded-xl border-[0.5px] p-2 text-sm dark:text-white">
            {activeFilters.map(([key, value], i) => (
              <div
                key={key}
                className="bg-primary/20 flex items-center gap-4 rounded-xl p-2"
              >
                <p className="capitalize">
                  <span>{formatLabel(key)}:</span>{" "}
                  {value.split(",").map((item, index, arr) => (
                    <span key={item}>
                      {arr.length > 1 ? (index === 0 ? "from: " : " to: ") : ""}
                      {formatLabel(item.split(".")[0])}
                    </span>
                  ))}
                  {key === "sort" && (
                    <span className="bg-primary/60 ms-2 rounded-md p-1 text-xs text-white uppercase">
                      {value.split(".")[1]}
                    </span>
                  )}
                </p>

                {isClearingFilter && clickedID === `${i}` ? (
                  <Spinner />
                ) : (
                  <X
                    size={16}
                    className="cursor-pointer transition-colors hover:text-white"
                    onClick={() => {
                      setClickedID(`${i}`);
                      clearFilter(key);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default ActiveFiltersPopover;
