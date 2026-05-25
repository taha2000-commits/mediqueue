import Link from "next/link";

import { statsServices } from "@/lib/services/stats";
import { cn } from "@/lib/utils";

export default async function PatientsMenubar({
  selected,
}: {
  selected?: string;
}) {
  const stats = await statsServices.doctor.getPatientsStats();

  return (
    <div className="mb-2 flex">
      <Tab
        innerText="all patients"
        searchParam=""
        isSelected={!selected}
        selectedClassName="border-status-completed text-status-completed"
      />
      <Tab
        innerText="active"
        searchParam="active"
        isSelected={selected === "active"}
        selectedClassName="border-status-accepted text-status-accepted"
        count={stats?.active_count}
      />
      <Tab
        innerText="new"
        searchParam="new"
        isSelected={selected === "new"}
        selectedClassName="border-status-accepted text-status-accepted"
        count={stats?.new_count}
      />
      <Tab
        innerText="returning"
        searchParam="returning"
        isSelected={selected === "returning"}
        selectedClassName="border-status-pending text-status-pending"
        count={stats?.returning_count}
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
  return (
    <Link
      href={`/dashboard/patients/${searchParam}`}
      className={cn(
        "flex cursor-pointer gap-1 border-b-2 p-2 px-4",
        isSelected && selectedClassName,
        count === 0 && "text-muted-foreground pointer-events-none",
      )}
    >
      {innerText}
      {count === 0 && (
        <span className="bg-background flex h-6 w-6 items-center justify-center rounded-full text-sm">
          0
        </span>
      )}
    </Link>
  );
};
