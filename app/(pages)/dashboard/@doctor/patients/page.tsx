import { PersonStanding } from "lucide-react";

import PaginationFooter from "@/app/components/PaginationFooter";
import { patientsService } from "@/lib/services/patients";

import Stat from "../_components/Stat";
import PatientsMenubar from "./_components/PatientsMenubar";
import PatientsTable from "./_components/PatientsTable";
import SelectedPatient from "./_components/SelectedPatient";

const page = async ({ searchParams }: PageProps<"/dashboard/patients">) => {
  const sp = await searchParams;

  const {
    results: patients,
    next,
    numOfPage,
    prev,
    page,
    count,
    from,
    to,
  } = await patientsService.getAll({
    params: { ...sp, limit: sp.limit ?? "10" },
  });

  const stats = await patientsService.getPatientsStats();
  const {
    active_count,
    inactive_count,
    new_count,
    returning_count,
    all_count,
  } = stats;

  return (
    <main className="space-y-3">
      <div className="grid grid-cols-5 gap-3">
        <Stat
          title="total patients"
          value={all_count}
          icon={PersonStanding}
          iconClassName="text-status-completed bg-status-completed/20"
        />
        <Stat
          title="new this month"
          value={new_count}
          icon={PersonStanding}
          iconClassName="text-status-accepted bg-status-accepted/20"
        />
        <Stat
          title="active patients"
          value={active_count}
          icon={PersonStanding}
          iconClassName="text-status-accepted bg-status-accepted/20"
        />
        <Stat
          title="inactive patients"
          value={inactive_count}
          icon={PersonStanding}
          iconClassName="text-status-accepted bg-status-accepted/20"
        />
        <Stat
          title="returning patients"
          value={returning_count}
          icon={PersonStanding}
          iconClassName="text-status-pending bg-status-pending/20"
        />
      </div>
      <div className="flex">
        <div className="bg-second-background h-fit flex-1 rounded-xl p-4 shadow">
          <PatientsMenubar stats={stats} />

          <PatientsTable patients={patients} />

          <PaginationFooter
            count={count}
            from={from}
            next={next}
            numOfPage={numOfPage}
            page={page}
            prev={prev}
            to={to}
            className="mt-5"
          />
        </div>

        <SelectedPatient />
      </div>
    </main>
  );
};

export default page;
