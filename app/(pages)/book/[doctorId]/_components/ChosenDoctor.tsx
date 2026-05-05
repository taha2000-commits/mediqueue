import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";

import DoctorDetailsDialog from "@/app/components/DoctorDetailsDialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctors";

type IProps = { doctor: Doctor };

const ChosenDoctor = ({ doctor }: IProps) => {
  const { avatar, name, email, phone, specialization } = doctor;
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Avatar className="outline-background border-background dark:outline-primary h-50 w-50 border-2 shadow-2xl outline-4 after:border-none">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object${avatar}`}
          alt={name}
          width={200}
          height={200}
        />
      </Avatar>
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold">{name}</h3>
        <h4 className="text-muted-foreground text-lg">{specialization}</h4>
        <div className="mt-3 flex gap-2">
          <Button asChild variant="outline" size="icon-sm">
            <Link href={"tel:+" + phone}>
              <BsTelephone />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon-sm">
            <Link href={"mailto:" + email}>
              <IoMailOutline />
            </Link>
          </Button>
          <DoctorDetailsDialog doctor={doctor} />
        </div>
      </div>
    </div>
  );
};

export default ChosenDoctor;
