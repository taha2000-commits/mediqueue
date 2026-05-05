"use client";
import { AlertCircleIcon, CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SubmitEventHandler,
  useActionState,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { toast } from "sonner";
import { z } from "zod";

import Button from "@/app/components/Button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { bookSchema } from "@/lib/validators/book-appointment-schema";
import { useBookStore } from "@/store/useBookStore";

import bookAction from "../actions";

type PatientInputs = {
  email: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  doctor_id: string;
};
const BookingForm = ({ doctorId }: { doctorId: string }) => {
  const validationsT = useTranslations("validations");

  const t = useTranslations("BookPage");

  const { date, time, addDate, addTime, setDisabled } = useBookStore();

  const [state, book, isPending] = useActionState(bookAction, undefined);

  const [validationErrors, setValidationErrors] = useState<
    Partial<PatientInputs> | undefined
  >();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const patient_name = formData.get("patient_name");
    const patient_email = formData.get("patient_email");
    const patient_phone = formData.get("patient_phone");
    const doctorIdVal = formData.get("doctor_id");
    const timeVal = formData.get("time");
    const dateVal = formData.get("date");

    const validation = bookSchema.safeParse({
      patient_name,
      patient_email,
      patient_phone,
      time: timeVal,
      date: dateVal,
      doctorId: doctorIdVal,
    });

    if (!validation.success) {
      const errors = z.treeifyError(validation.error).properties;

      setValidationErrors({
        email: errors?.patient_email?.errors[0],
        name: errors?.patient_name?.errors[0],
        phone: errors?.patient_phone?.errors[0],
        doctor_id: errors?.doctorId?.errors[0],
        date: errors?.date?.errors[0],
        time: errors?.time?.errors[0],
      });

      e.preventDefault();
    } else {
      setValidationErrors(undefined);
    }
  };

  const onSuccess = useEffectEvent(() => {
    if (state?.success) {
      toast.success(t(state.success), {
        position: "top-center",
      });
      addTime("");
      addDate("");
    }
  });

  useEffect(() => {
    onSuccess();
  }, [state]);

  useEffect(() => {
    setDisabled(isPending);
  }, [isPending, setDisabled]);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{t("BookingForm.addDetails")}</CardTitle>
        {(date || time) && (
          <div className="flex gap-2">
            <Badge variant={"outline"}>
              {t("date")}: {date}
            </Badge>
            <Badge variant={"outline"}>
              {t("time")}: {time}
            </Badge>
          </div>
        )}
        {(validationErrors?.time || state?.error) && (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertDescription>
              {validationErrors?.time
                ? validationsT(validationErrors?.time)
                : state?.error
                  ? state.error
                  : ""}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} action={book}>
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
            <Input
              name="doctor_id"
              className="hidden"
              defaultValue={doctorId}
              readOnly
              required
            />
            <Input
              name="date"
              className="hidden"
              defaultValue={date}
              readOnly
              required
            />
            <Input
              name="time"
              className="hidden"
              defaultValue={time}
              readOnly
              required
            />
          </FieldGroup>
          <Button type="submit" disabled={isPending} className="mt-6 w-full">
            <CalendarPlus size={18} />
            <span className="">{t("bookAppointment")}</span>
            {isPending && <Spinner />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
