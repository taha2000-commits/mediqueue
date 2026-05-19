"use client";
import { Check } from "lucide-react";
import { SubmitEventHandler, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import SpecializationSelect from "@/app/components/SpecializationSelect";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useShowSuccessIcon } from "@/hooks/useShowSuccessIcon";
import { specializations } from "@/lib/constants";
import { cn, equal } from "@/lib/utils";
import { doctor_profile_schema } from "@/lib/validators/update-doctor-profile";
import { Doctor } from "@/types/doctors";

import { changeData } from "../actions";
import ProfilePhotoSection from "./ProfilePhotoSection";

export type UpdateDoctorFormType = {
  full_name: string;
  full_name_ar: string;
  specialization: string;
  specialization_ar?: string;
  email: string;
  phone: string;
  description: string;
  description_ar: string;
  photo: File;
};

type UpdateDoctorFormErrors = {
  full_name?: string;
  full_name_ar?: string;
  specialization?: string;
  specialization_ar?: string;
  email?: string;
  phone?: string;
  photo?: string;
};

interface UpdateDoctorFormProps {
  doctor: Doctor;
}

function UpdateDoctorForm({ doctor }: UpdateDoctorFormProps) {
  const [state, change, isPending] = useActionState(changeData, undefined);

  const [validationErrors, setValidationErrors] =
    useState<UpdateDoctorFormErrors>();
  const [isNotChangedError, setIsNotChangedError] = useState<string>();
  const [ar_specialization, setArSpecialization] = useState<string>();
  const { isShow, setIsShow } = useShowSuccessIcon();

  const onsubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const {
      email,
      full_name,
      phone,
      photo,
      specialization,
      description,
      full_name_ar,
      specialization_ar,
    } = Object.fromEntries(formData.entries()) as UpdateDoctorFormType;

    const validation = doctor_profile_schema.safeParse({
      email,
      full_name,
      full_name_ar,
      phone,
      photo,
      specialization,
      specialization_ar,
    });

    const isNotChanged =
      !photo.name &&
      equal(
        { email, phone, full_name, specialization, description, full_name_ar },
        {
          email: doctor.email,
          phone: doctor.phone,
          full_name: doctor.name,
          specialization: doctor.specialization,
          description: doctor.description_en,
          description_ar: doctor.description_ar,
          full_name_ar: doctor.name_ar,
        },
      );

    if (isNotChanged) {
      setIsNotChangedError("please change any of profile details");
      e.preventDefault();
    } else if (!validation.success) {
      const errors = z.treeifyError(validation.error).properties;

      setValidationErrors({
        email: errors?.email?.errors[0],
        full_name: errors?.full_name?.errors[0],
        phone: errors?.phone?.errors[0],
        photo: errors?.photo?.errors[0],
        specialization: errors?.specialization?.errors[0],
        full_name_ar: errors?.full_name_ar?.errors[0],
        specialization_ar: errors?.specialization_ar?.errors[0],
      });
      e.preventDefault();
    } else {
      setValidationErrors(undefined);
      setIsNotChangedError(undefined);
    }
  };
  useEffect(() => {
    if (state?.isSuccess && !isPending) {
      toast.success(state.successMsg);
      setIsShow(true);
    }
  }, [state?.isSuccess, isPending, setIsShow, state?.successMsg]);

  return (
    <form
      action={change}
      onSubmit={onsubmit}
      className="bg-second-background h- w-full space-y-5 rounded-xl p-6 shadow"
    >
      <div className="">
        <h2 className="text-xl font-bold">profile information</h2>
        <p className="text-muted-foreground text-md">
          update your personal details and profile information
        </p>
      </div>
      {(isNotChangedError || state?.error) && (
        <Alert variant={"destructive"} className="text-xs">
          {isNotChangedError || state?.error}
        </Alert>
      )}
      <div className="flex gap-10">
        <ProfilePhotoSection doctor={doctor} error={validationErrors?.photo} />
        <div className="bg-background grid flex-1 gap-5 rounded-2xl p-4">
          <FieldGroup className="grid grid-cols-2">
            <Field aria-invalid={!!validationErrors?.full_name}>
              <FieldLabel htmlFor="full-name">full name</FieldLabel>
              <Input
                className="rounded-lg"
                id="full-name"
                name="full_name"
                aria-invalid={!!validationErrors?.full_name}
                defaultValue={doctor.name_en}
              />
              <FieldError className="text-xs">
                {validationErrors?.full_name}
              </FieldError>
            </Field>
            <Field aria-invalid={!!validationErrors?.full_name_ar}>
              <FieldLabel htmlFor="full-name">arabic full name</FieldLabel>
              <Input
                className="rounded-lg"
                id="full-name"
                name="full_name_ar"
                aria-invalid={!!validationErrors?.full_name_ar}
                defaultValue={doctor.name_ar}
                dir="rtl"
              />
              <FieldError className="text-xs">
                {validationErrors?.full_name_ar}
              </FieldError>
            </Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-2">
            <Field aria-invalid={!!validationErrors?.specialization}>
              <FieldLabel htmlFor="specialization">specialization</FieldLabel>
              <SpecializationSelect
                use_search_params={false}
                defaultValue={doctor.specialization_en}
                onChange={(val) => {
                  const arVal = specializations.find((sp) =>
                    sp["en"].includes(val),
                  )?.["ar"];
                  setArSpecialization(arVal);
                }}
              />
              <FieldError className="text-xs">
                {validationErrors?.specialization}
              </FieldError>
            </Field>
            <Field aria-invalid={!!validationErrors?.specialization_ar}>
              <FieldLabel htmlFor="specialization_ar">
                specialization in arabic
              </FieldLabel>
              <Input
                className="rounded-lg"
                id="specialization_ar"
                name="specialization_ar"
                aria-invalid={!!validationErrors?.specialization_ar}
                value={ar_specialization ?? doctor.specialization_ar}
                readOnly
                dir="rtl"
              />
              <FieldError className="text-xs">
                {validationErrors?.specialization_ar}
              </FieldError>
            </Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-2">
            <Field aria-invalid={!!validationErrors?.email}>
              <FieldLabel htmlFor="email">email address</FieldLabel>
              <Input
                className="rounded-lg"
                id="email"
                name="email"
                aria-invalid={!!validationErrors?.email}
                defaultValue={doctor.email}
              />
              <FieldError className="text-xs">
                {validationErrors?.email}
              </FieldError>
            </Field>
            <Field aria-invalid={!!validationErrors?.phone}>
              <FieldLabel htmlFor="phone">phone number</FieldLabel>
              <Input
                className="rounded-lg"
                id="phone"
                name="phone"
                placeholder="Lee"
                aria-invalid={!!validationErrors?.phone}
                defaultValue={doctor.phone || ""}
              />
              <FieldError className="text-xs">
                {validationErrors?.phone}
              </FieldError>
            </Field>
          </FieldGroup>
        </div>
      </div>

      <FieldGroup className="grid grid-cols-2">
        {" "}
        <Field className="bg-background rounded-2xl p-4">
          <FieldLabel htmlFor="description_en">about me in english</FieldLabel>
          <Textarea
            id="description_en"
            name="description"
            defaultValue={doctor.description_en || ""}
            placeholder="Type your message here."
          />
        </Field>
        <Field className="bg-background rounded-2xl p-4">
          <FieldLabel htmlFor="description_ar"> about me in arabic</FieldLabel>
          <Textarea
            id="description_ar"
            name="description_ar"
            defaultValue={doctor.description_ar || ""}
            placeholder="Type your message here."
          />
        </Field>
      </FieldGroup>
      <div className="flex justify-end">
        <Button
          type="submit"
          className={cn(
            "bg-tertiary rounded-lg",
            isShow && "bg-status-accepted",
          )}
        >
          {isShow ? (
            <Check className="transition-all duration-200" />
          ) : isPending ? (
            <Spinner />
          ) : null}
          save changes
        </Button>
      </div>
    </form>
  );
}
export default UpdateDoctorForm;
