import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Doctor } from "@/types/doctors";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="h-17 w-17 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object${doctor.avatar}`}
            alt={doctor.name}
            width={68}
            height={68}
          />
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-1">
        <ItemTitle className="text-xl">{doctor.name}</ItemTitle>
        <ItemDescription>{doctor.specialization}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href={`/book/${doctor.id}`}>
            <PlusIcon />
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
};

export default DoctorCard;
