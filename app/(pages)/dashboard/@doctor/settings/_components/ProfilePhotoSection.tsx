import { AlertCircleIcon, Trash, Upload } from "lucide-react";
import Image from "next/image";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Doctor } from "@/types/doctors";

const ProfilePhotoSection = ({
  error,
  doctor,
}: {
  doctor: Doctor;
  error: string | undefined;
}) => {
  return (
    <div className="grid h-fit gap-5">
      <h5 className="font-semibold">profile photo</h5>
      {error && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>photo invalid</AlertTitle>
          <AlertDescription className="normal-case">{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-4">
        <Avatar className="outline-background border-background dark:outline-primary h-30 w-30 border-2 shadow-2xl outline-4 after:border-none">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${doctor.avatar}`}
            alt={doctor.name}
            width={120}
            height={120}
          />
        </Avatar>
        <div className="grid gap-2">
          <Button
            variant={"outline"}
            className="border-status-completed text-status-completed bg-secondary w-full cursor-pointer rounded-lg"
            asChild
          >
            <FieldLabel htmlFor="picture">
              <Upload /> <span className="">change photo</span>
            </FieldLabel>
          </Button>
          <Input id="picture" name="photo" type="file" className="hidden" />
          <Button variant={"destructive"} className="rounded-lg">
            <Trash /> <span className="">remove</span>
          </Button>
          <p className="text-muted-foreground text-xs normal-case">
            JPG, PNG, WEBP. Max size 2MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoSection;
