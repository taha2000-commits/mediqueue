"use client";

import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

const FiltersBar = () => {
  const searchParams = useSearchParams();
  const { urlSearchParams } = useHandleSearchParams();

  const params = Array.from(searchParams.entries()).filter(([, v]) => v);

  const clearFilter = (param: string) => {
    urlSearchParams.delete(param);
  };

  const clearAll = () => {
    urlSearchParams.clear();
  };
  if (!params?.[0]) return null;
  return (
    <div className="border-primary bg-primary/20 text-primary flex items-center justify-between rounded-xl border-[0.5px] px-3 py-1 text-sm dark:text-white">
      <div className="flex items-center gap-8">
        <p className="font-bold">Active Filters ({params.length})</p>
        <div className="flex items-center gap-3">
          {params.map(([param, value], i) => (
            <div
              key={i}
              className="bg-primary/20 flex items-center gap-4 rounded-xl p-2 text-sm [&_.icon]:hover:text-white [&_.icon]:dark:hover:text-white"
            >
              <p className="capitalize">
                <span>{param}:</span>{" "}
                <span>{value.split(".")[0].split("_").join(" ")}</span>
                {param == "sort" && (
                  <span className="bg-primary/60 ms-2 rounded-md p-1 text-xs text-white uppercase">
                    {value.split(".")[1]}
                  </span>
                )}
              </p>
              <X
                size={16}
                onClick={() => clearFilter(param)}
                className="icon cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        variant={"outline"}
        className="border-primary bg-primary text-white"
        onClick={clearAll}
        size={"sm"}
      >
        <span>Clear All</span>
        <X />
      </Button>
    </div>
  );
};

export default FiltersBar;
