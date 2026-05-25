import { statsServices } from "@/lib/services/stats";

import MenubarItem from "./MenubarItem";
import { SortSelect } from "./SortSelect";

export default async function RequestsMenubar({
  selectedTab,
}: {
  selectedTab?: string;
}) {
  const doctor_stats = await statsServices.doctor.getStats();

  if (!doctor_stats) return null;

  const {
    total_accepted,
    total_appointments,
    total_cancelled,
    total_pending,
    total_rejected,
    total_expired,
  } = doctor_stats;

  return (
    <div className="border-b-border grid grid-cols-8 border-b text-sm capitalize">
      <MenubarItem
        innerText="all requests"
        count={total_appointments}
        countClassName="bg-tertiary/40 text-tertiary"
        selectedClassName="border-tertiary border-b"
        name={undefined}
        selected={!selectedTab}
      />

      <MenubarItem
        innerText="pending"
        count={total_pending}
        countClassName="bg-status-pending/40 text-status-pending"
        selectedClassName="border-status-pending border-b"
        name="pending"
        selected={selectedTab == "pending"}
      />

      <MenubarItem
        innerText="rejected"
        count={total_rejected}
        countClassName="bg-status-rejected/40"
        selectedClassName="border-status-rejected border-b"
        name="rejected"
        selected={selectedTab == "rejected"}
      />

      <MenubarItem
        innerText="accepted"
        count={total_accepted}
        countClassName="bg-status-accepted/40 text-status-accepted"
        selectedClassName="border-status-accepted border-b"
        name="accepted"
        selected={selectedTab == "accepted"}
      />

      <MenubarItem
        innerText="cancelled"
        count={total_cancelled}
        countClassName="bg-muted-foreground/40 text-muted-foreground"
        selectedClassName="border-muted-foreground border-b"
        name="cancelled"
        selected={selectedTab == "cancelled"}
      />

      <MenubarItem
        innerText="expired"
        count={total_expired}
        countClassName="bg-destructive/40 text-destructive"
        selectedClassName="border-destructive border-b"
        name="expired"
        selected={selectedTab == "expired"}
      />

      <div className="col-span-2 flex items-center justify-end">
        <SortSelect />
      </div>
    </div>
  );
}
