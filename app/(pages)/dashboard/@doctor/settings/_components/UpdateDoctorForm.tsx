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
import { useSidebar } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { useShowSuccessIcon } from "@/hooks/useShowSuccessIcon";
import { specializations } from "@/lib/constants";
import { cn, equal } from "@/lib/utils";
import { doctor_profile_schema } from "@/lib/validators/update-doctor-profile";
import { Doctor } from "@/types/doctors";

import { changeData } from "../actions";
import ProfilePhotoSection from "./ProfilePhotoSection";

export type UpdateDoctorFormType = {
  name_en: string;
  name_ar: string;
  specialization_en: string;
  specialization_ar?: string;
  email: string;
  phone: string;
  description_en: string;
  description_ar: string;
  photo: File;
};

type UpdateDoctorFormErrors = {
  name_en?: string;
  name_ar?: string;
  specialization_en?: string;
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
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const onsubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);

    const {
      email,
      name_en,
      phone,
      photo,
      specialization_en,
      description_en,
      name_ar,
      specialization_ar,
    } = Object.fromEntries(formData.entries()) as UpdateDoctorFormType;

    const validation = doctor_profile_schema.safeParse({
      email,
      name_en,
      name_ar,
      phone,
      photo,
      specialization_en,
      specialization_ar,
    });

    const isNotChanged =
      !photo.name &&
      equal(
        { email, phone, name_en, specialization_en, description_en, name_ar },
        {
          email: doctor.email,
          phone: doctor.phone,
          name_en: doctor.name_en,
          specialization: doctor.specialization,
          description: doctor.description_en,
          description_ar: doctor.description_ar,
          name_ar: doctor.name_ar,
        },
      );

    if (isNotChanged) {
      setIsNotChangedError("please change any of profile details");
      e.preventDefault();
    } else if (!validation.success) {
      const errors = z.treeifyError(validation.error).properties;

      setValidationErrors({
        email: errors?.email?.errors[0],
        name_en: errors?.name_en?.errors[0],
        phone: errors?.phone?.errors[0],
        photo: errors?.photo?.errors[0],
        specialization_en: errors?.specialization_en?.errors[0],
        name_ar: errors?.name_ar?.errors[0],
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
      className="bg-secondary flex-1 space-y-5 rounded-xl p-6 shadow"
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
      <div
        className={cn("flex gap-10", {
          "flex-col": open || isMobile || isTablet,
        })}
      >
        <ProfilePhotoSection doctor={doctor} error={validationErrors?.photo} />
        <div className="bg-background grid flex-1 gap-5 rounded-2xl p-4">
          <FieldGroup
            className={cn("grid grid-cols-2 gap-y-3", {
              "grid-cols-1": (open && isTablet) || isMobile,
            })}
          >
            <Field aria-invalid={!!validationErrors?.name_en}>
              <FieldLabel htmlFor="full-name">full name</FieldLabel>
              <Input
                className="rounded-lg"
                id="full-name"
                name="name_en"
                aria-invalid={!!validationErrors?.name_en}
                defaultValue={doctor.name_en}
              />
              <FieldError className="text-xs">
                {validationErrors?.name_en}
              </FieldError>
            </Field>
            <Field aria-invalid={!!validationErrors?.name_ar}>
              <FieldLabel htmlFor="full-name">arabic full name</FieldLabel>
              <Input
                className="rounded-lg"
                id="full-name"
                name="name_ar"
                aria-invalid={!!validationErrors?.name_ar}
                defaultValue={doctor.name_ar}
                dir="rtl"
              />
              <FieldError className="text-xs">
                {validationErrors?.name_ar}
              </FieldError>
            </Field>
          </FieldGroup>
          <FieldGroup
            className={cn("grid grid-cols-2 gap-y-3", {
              "grid-cols-1": (open && isTablet) || isMobile,
            })}
          >
            <Field aria-invalid={!!validationErrors?.specialization_en}>
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
                name="specialization_en"
              />
              <FieldError className="text-xs">
                {validationErrors?.specialization_en}
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
          <FieldGroup
            className={cn("grid grid-cols-2 gap-y-3", {
              "grid-cols-1": (open && isTablet) || isMobile,
            })}
          >
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

      <FieldGroup
        className={cn("grid grid-cols-2 gap-y-3", {
          "grid-cols-1": (open && isTablet) || isMobile,
        })}
      >
        <Field className="bg-background rounded-2xl p-4">
          <FieldLabel htmlFor="description_en">about me in english</FieldLabel>
          <Textarea
            id="description_en"
            name="description_en"
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
