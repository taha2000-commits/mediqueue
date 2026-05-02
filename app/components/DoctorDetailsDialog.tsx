"use client";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Doctor } from "@/types/doctors";

export default function DoctorDetailsDialog({ doctor }: { doctor: Doctor }) {
  const t = useTranslations("BookPage");
  if (doctor)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <EyeIcon size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("doctorDialog.doctorDetails")}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Avatar className="outline-background border-background dark:outline-primary h-30 w-30 border-2 shadow-2xl outline-4 after:border-none">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object${doctor["avatar"]}`}
                alt={doctor["name"]}
                width={120}
                height={120}
              />
            </Avatar>
            <h1 className="mt-3 text-lg font-bold">{doctor.name}</h1>
          </div>
          <Table className="text-xs">
            <TableBody>
              <TableRow>
                <TableCell>{t("specialization")}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t("doctorDialog.email")}</TableCell>
                <TableCell dir="ltr">{doctor.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t("doctorDialog.phone")}</TableCell>
                <TableCell className=" " dir="ltr">
                  {doctor.phone}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    );
}
