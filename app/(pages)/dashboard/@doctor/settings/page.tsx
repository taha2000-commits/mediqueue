import { CalendarCog, Settings } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { getDoctorUser } from "@/lib/auth/getDoctorUser";

import AvailabilitySettings from "./_components/AvailabilitySettings";
import ChangePassword from "./_components/ChangePassword";
import UpdateDoctorForm from "./_components/UpdateDoctorForm";

export const metadata: Metadata = {
  title: "Settings",
  description: "doctor taha dashboard",
};

const page = async () => {
  const doctor = await getDoctorUser();

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <UpdateDoctorForm doctor={doctor} />

        <div className="grid h-fit w-md gap-6">
          <div className="bg-second-background h-fit rounded-xl p-5 shadow">
            <div className="mb-5 flex items-center gap-2">
              <Settings size={18} />
              <h2 className="font-semibold">availability settings</h2>
            </div>

            <AvailabilitySettings doctor={doctor} />
          </div>
          <div className="bg-second-background h-fit rounded-xl p-5 shadow">
            <h2 className="mb-5 font-semibold">quick actions</h2>

            <ChangePassword />

            <Separator />

            <Link
              href={"/dashboard/availability"}
              className="hover:bg-background flex cursor-pointer gap-4 p-2 text-sm"
            >
              <CalendarCog className="text-status-completed" />
              <div className="">
                <h6 className="font-semibold">manage availability</h6>
                <span className="text-muted-foreground text-xs font-semibold">
                  go to availability settings
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
