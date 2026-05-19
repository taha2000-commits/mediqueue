"use client";
import { useSearchParams } from "next/navigation";

import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";
import { cn } from "@/lib/utils";
import { PatientStats } from "@/types/patients";

export default function PatientsMenubar({ stats }: { stats: PatientStats }) {
  const sp = useSearchParams();
  const selected = sp.get("type");

  return (
    <div className="mb-2 flex">
      <Tab
        innerText="all patients"
        searchParam="all"
        isSelected={!selected || selected === "all"}
        selectedClassName="border-status-completed text-status-completed"
      />
      <Tab
        innerText="active"
        searchParam="active"
        isSelected={selected === "active"}
        selectedClassName="border-status-accepted text-status-accepted"
        count={stats.active_count}
      />
      <Tab
        innerText="new"
        searchParam="new"
        isSelected={selected === "new"}
        selectedClassName="border-status-accepted text-status-accepted"
        count={stats.new_count}
      />
      <Tab
        innerText="returning"
        searchParam="returning"
        isSelected={selected === "returning"}
        selectedClassName="border-status-pending text-status-pending"
        count={stats.returning_count}
      />
    </div>
  );
}

const Tab = ({
  innerText,
  isSelected,
  selectedClassName,
  searchParam,
  count,
}: {
  innerText: string;
  searchParam: string;
  isSelected: boolean;
  selectedClassName: string;
  count?: number;
}) => {
  const { urlSearchParams } = useHandleSearchParams();
  const onclick = () => {
    urlSearchParams.setWithClear("type", searchParam);
  };
  return (
    <div
      className={cn(
        "flex cursor-pointer gap-1 border-b-2 p-2 px-4",
        isSelected && selectedClassName,
        count === 0 && "text-muted-foreground pointer-events-none",
      )}
      onClick={onclick}
    >
      {innerText}
      {count === 0 && (
        <span className="bg-background flex h-6 w-6 items-center justify-center rounded-full text-sm">
          0
        </span>
      )}
    </div>
  );
};
