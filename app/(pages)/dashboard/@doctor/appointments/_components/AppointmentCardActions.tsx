import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppointmentWithPriority } from "@/types/appointments";

import RequestDetails from "./RequestDetails";

const AppointmentCardActions = ({
  appointment,
}: {
  appointment: AppointmentWithPriority;
}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className={"size-7 rounded-md md:size-9 md:rounded-lg"}
          >
            <Eye size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex max-h-[90vh] items-center justify-center rounded-t-2xl p-5"
        >
          <div className="h-full overflow-y-auto">
            <RequestDetails request={appointment} className="ms-0" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AppointmentCardActions;
