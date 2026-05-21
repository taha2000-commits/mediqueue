import { FileSpreadsheet } from "lucide-react";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const PatientHistoryDialog = ({
  patient,
  btnClassName,
  btnDisabled = false,
}: {
  patient: { name: string; avatar: string };
  btnClassName?: string;
  btnDisabled?: boolean;
}) => {
  return (
    <div>
      <Dialog aria-describedby={undefined}>
        <DialogTrigger asChild>
          <button
            disabled={btnDisabled}
            className={cn(
              "border-border bg-primary/20 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border p-5 text-center text-sm",
              btnClassName,
            )}
          >
            <FileSpreadsheet size={40} className="text-primary" />
            <p className="capitalize">view patient history</p>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Patient history</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Avatar className="outline-background border-background dark:outline-primary h-30 w-30 border-2 shadow-2xl outline-4 after:border-none">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${patient["avatar"]}`}
                alt={patient["name"]}
                width={120}
                height={120}
              />
            </Avatar>
            <h1 className="mt-3 text-lg font-bold">{patient["name"]}</h1>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientHistoryDialog;
