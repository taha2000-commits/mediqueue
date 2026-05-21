import { LockKeyhole } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ChangePassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:bg-background flex cursor-pointer gap-4 p-2 text-sm">
          <LockKeyhole className="text-status-completed" />
          <div className="">
            <h6 className="font-semibold">change password</h6>
            <span className="text-muted-foreground text-xs font-semibold">
              update your account password
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>change password</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePassword;
