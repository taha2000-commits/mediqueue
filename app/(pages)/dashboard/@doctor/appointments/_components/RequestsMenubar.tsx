import { appointmentsService } from "@/lib/services/appointments";

import MenubarItem from "./MenubarItem";
import { SortSelect } from "./SortSelect";

export default async function RequestsMenubar({
  selectedTab,
}: {
  selectedTab?: string;
}) {
  const {
    all_count,
    accepted_count,
    cancelled_count,
    pending_count,
    rejected_count,
    expired_count,
  } = await appointmentsService.getAppointmentsStats();

  return (
    <div className="border-b-border grid grid-cols-8 border-b text-sm capitalize">
      <MenubarItem
        innerText="all requests"
        count={all_count}
        countClassName="bg-tertiary/40 text-tertiary"
        selectedClassName="border-tertiary border-b"
        name={undefined}
        selected={!selectedTab}
      />

      <MenubarItem
        innerText="pending"
        count={pending_count}
        countClassName="bg-status-pending/40 text-status-pending"
        selectedClassName="border-status-pending border-b"
        name="pending"
        selected={selectedTab == "pending"}
      />

      <MenubarItem
        innerText="rejected"
        count={rejected_count}
        countClassName="bg-status-rejected/40"
        selectedClassName="border-status-rejected border-b"
        name="rejected"
        selected={selectedTab == "rejected"}
      />

      <MenubarItem
        innerText="accepted"
        count={accepted_count}
        countClassName="bg-status-accepted/40 text-status-accepted"
        selectedClassName="border-status-accepted border-b"
        name="accepted"
        selected={selectedTab == "accepted"}
      />

      <MenubarItem
        innerText="cancelled"
        count={cancelled_count}
        countClassName="bg-muted-foreground/40 text-muted-foreground"
        selectedClassName="border-muted-foreground border-b"
        name="cancelled"
        selected={selectedTab == "cancelled"}
      />

      <MenubarItem
        innerText="expired"
        count={expired_count}
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
