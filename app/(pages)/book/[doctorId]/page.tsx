import Breadcrumb from "@/app/components/Breadcrumb";
import DatesSelect from "@/app/components/DatesSelect";
import ScheduleTable from "@/app/components/schedule-table/ScheduleTable";
import { fetchData } from "@/lib/api/fetch";
import { AppointmentRow } from "@/types/appointments";
import { Schedule } from "@/types/doctor-schedule";
import { Doctor } from "@/types/doctors";

import BookingForm from "./_components/BookingForm";
import ChosenDoctor from "./_components/ChosenDoctor";

const page = async ({ params,searchParams }: PageProps<"/book/[doctorId]">) => {
  const { doctorId } = await params;
  const schedule = await fetchData<{
    weekly_schedule: Schedule;
    doctors: Doctor;
  }>({
    url: `/doctors/${doctorId}/schedule`,
  });

  const appointments = await fetchData<AppointmentRow[]>({
    url: `/appointments/${doctorId}`,
    init: { next: { tags: ["appointments"] } },
  });

  return (
    <div className="p-10">
      <div className="mb-10" dir="ltr">
        <Breadcrumb
          current={`Booking`}
          pages={[
            { name: "Home", href: "/" },
            { name: "doctors", href: "/book" },
          ]}
        />
      </div>
      <div className="mb-10 grid grid-cols-2">
        <div className="flex flex-1 items-center justify-center">
          <ChosenDoctor doctor={schedule["doctors"]} />
        </div>
        <div className="flex justify-center">
          <BookingForm doctorId={doctorId} />
        </div>
      </div>
      <div className="mb-10 flex justify-end" dir="ltr">
        <DatesSelect />
      </div>
      <ScheduleTable
        weekly_schedule={schedule.weekly_schedule}
        appointments={appointments}
        searchParams={searchParams}
      />
    </div>
  );
};

export default page;
