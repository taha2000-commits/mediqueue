import Image from "next/image";
import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";

import ScheduleTable from "@/app/components/schedule-table/ScheduleTable";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/api/fetch";
import { AppointmentRow } from "@/lib/supabase/types";
import { Schedule } from "@/types/doctor-schedule";
import { Doctor } from "@/types/doctors";

import DoctorDetailsDialog from "../../../components/DoctorDetailsDialog";
import BookingForm from "./_components/BookingForm";

const page = async ({ params }: PageProps<"/book/[doctorId]">) => {
  const { doctorId } = await params;

  const schedule = await fetchData<{
    weekly_schedule: Schedule;
    doctors: Doctor;
  }>({
    url: `/doctors/${doctorId}/schedule`,
  });

  const appointments = await fetchData<AppointmentRow[]>({
    url: `/appointments/${doctorId}`,
  });

  return (
    <div className="p-10">
      <div className="mb-10 grid grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="flex gap-5">
            <Avatar className="outline-background border-background dark:outline-primary h-30 w-30 border-2 shadow-2xl outline-4 after:border-none">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object${schedule["doctors"]?.["avatar"]}`}
                alt={schedule["doctors"]?.["name"]}
                width={120}
                height={120}
              />
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold">{schedule.doctors?.name}</h3>
              <h4 className="text-muted-foreground text-lg">
                {schedule.doctors?.specialization}
              </h4>
              <div className="mt-3 flex gap-2">
                <Button asChild variant="outline" size="icon-sm">
                  <Link href={"tel:+" + schedule.doctors.phone}>
                    <BsTelephone />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon-sm">
                  <Link href={"mailto:" + schedule.doctors.email}>
                    <IoMailOutline />
                  </Link>
                </Button>
                <DoctorDetailsDialog doctor={schedule.doctors} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <BookingForm />
        </div>
      </div>
      <ScheduleTable
        weekly_schedule={schedule.weekly_schedule}
        appointments={appointments}
      />
    </div>
  );
};

export default page;
