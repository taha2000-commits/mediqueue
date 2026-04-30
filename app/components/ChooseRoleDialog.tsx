"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Button from "./Button";

const ChooseRoleDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="SECONDARY">
          Doctor & Admin Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>choose your role.</DialogTitle>
        </DialogHeader>
        <div className="flex gap-3">
          <div
            className="bg-primary hover:bg-primary-hover flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl text-xl text-white"
            onClick={() => {
              setOpen(false);
              router.push("/login");
            }}
          >
            <FaUserDoctor size={50} />
            <span className="">Doctor</span>
          </div>
          <div
            className="bg-primary hover:bg-primary-hover flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl text-xl text-white"
            onClick={() => {
              setOpen(false);
              router.push("/login?role=admin");
            }}
          >
            <GrUserAdmin size={50} />
            <span className="">Admin/Manager</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseRoleDialog;
