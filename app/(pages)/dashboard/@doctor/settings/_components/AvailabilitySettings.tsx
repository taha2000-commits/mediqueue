"use client";
import { ChangeEventHandler, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import CustomSelect from "@/app/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { equal } from "@/lib/utils";
import { Doctor } from "@/types/doctors";

import { addDefaultValues } from "../actions";

export type DefaultValuesForm = {
  slot_duration: string;
  buffer_time: string;
  language: string;
};

function AvailabilitySettings({ doctor }: { doctor: Doctor }) {
  const [state, action, isPending] = useActionState(
    addDefaultValues,
    undefined,
  );

  const [disabled, setDisabled] = useState<boolean>(true);

  const onChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const { buffer_time, language, slot_duration } = Object.fromEntries(
      formData.entries(),
    ) as DefaultValuesForm;

    const isNotChanged = equal(
      { buffer_time, language, slot_duration },
      {
        slot_duration: doctor.slot_duration?.toString(),
        buffer_time: doctor.buffer_time?.toString(),
        language: doctor.language,
      },
    );

    if (isNotChanged) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    const set = () => setDisabled(true);

    if (doctor && state?.isSuccess) set();
  }, [doctor, state]);

  useEffect(() => {
    if (state?.isSuccess) toast.success(state.successMsg);
    else if (state?.isSuccess == false) toast.error(state?.error);
  }, [state]);

  return (
    <form action={action} onChange={onChange} className="space-y-3">
      <Field className="flex flex-col gap-2">
        <FieldLabel className="">default slot duration</FieldLabel>
        <div>
          <Select
            name="slot_duration"
            defaultValue={doctor.slot_duration?.toString() || ""}
          >
            <SelectTrigger className="border-ring w-full border">
              <SelectValue placeholder="slot duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="60">60</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-muted-foreground mt-1 text-xs normal-case">
            Default duration for new slots
          </p>
        </div>
      </Field>
      <Field className="flex flex-col gap-2">
        <FieldLabel className="">default buffer time</FieldLabel>
        <div className="">
          <Select
            name="buffer_time"
            defaultValue={doctor.buffer_time?.toString() || ""}
          >
            <SelectTrigger className="border-ring w-full border">
              <SelectValue placeholder="buffer time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="60">60</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription className="text-muted-foreground mt-1 text-xs normal-case">
            Time after each period
          </FieldDescription>
        </div>
      </Field>
      <Field className="flex flex-col gap-2">
        <FieldLabel className="">language</FieldLabel>
        <div className="">
          <CustomSelect
            name="language"
            defaultValue={doctor.language || ""}
            placeholder="choose language"
            options={[
              { text: "arabic", value: "ar" },
              { text: "english", value: "en" },
            ]}
          />

          <FieldDescription className="text-muted-foreground mt-1 text-xs normal-case">
            Preference language
          </FieldDescription>
        </div>
      </Field>

      <div className="flex justify-end">
        <Button type="submit" disabled={disabled} className="rounded-lg">
          {isPending && <Spinner />} save
        </Button>
      </div>
    </form>
  );
}

export default AvailabilitySettings;
