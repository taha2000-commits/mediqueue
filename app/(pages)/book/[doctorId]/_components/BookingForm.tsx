"use client";
import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitEventHandler, useState } from "react";
import { z } from "zod";

import Button from "@/app/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookSchema } from "@/lib/validators/book-appointment-schema";

type PatientInputs = {
  email: string;
  name: string;
  phone: string;
};
const BookingForm = () => {
  const validationsT = useTranslations("validations");
  const t = useTranslations("BookPage");

  // const [state, book, ispending] = useActionState(bookAction, undefined);

  const [validationErrors, setValidationErrors] = useState<
    Partial<PatientInputs> | undefined
  >();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const validation = bookSchema.safeParse({ name, email, phone });

    if (!validation.success) {
      setValidationErrors({
        email: z.treeifyError(validation.error).properties?.patient_email
          ?.errors[0],
        name: z.treeifyError(validation.error).properties?.patient_name
          ?.errors[0],
        phone: z.treeifyError(validation.error).properties?.patient_phone
          ?.errors[0],
      });
    } else {
    }
  };
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{t("BookingForm.addDetails")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Field className="grid gap-2">
                <Label htmlFor="name" className="capitalize">
                  {t("BookingForm.patientName")}
                </Label>

                <Input id="name" name="patient_name" type="text" required />
                {validationErrors?.name && (
                  <FieldError>{validationsT(validationErrors.name)}</FieldError>
                )}
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="phone" className="capitalize">
                  {t("BookingForm.patientPhone")}
                </FieldLabel>

                <Input id="phone" name="patient_phone" type="text" required />
                {validationErrors?.phone && (
                  <FieldError>
                    {validationsT(validationErrors.phone)}
                  </FieldError>
                )}
              </Field>
            </div>
            <div className="grid">
              <div className="grid gap-2">
                <Label htmlFor="email" className="capitalize">
                  {t("BookingForm.patientEmail")}
                </Label>
                <Input
                  id="email"
                  name="patient_email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {validationErrors?.email && (
                  <FieldError>
                    {validationsT(validationErrors.email)}
                  </FieldError>
                )}
              </div>
            </div>
          </FieldGroup>
          <Button type="submit" className="mt-6 w-full">
            <CalendarPlus size={18} />
            <span className="">{t("bookAppointment")}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
