"use client";
import {
  SubmitEventHandler,
  useActionState,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { toast } from "sonner";
import z from "zod";

import Button from "@/app/components/Button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signupSchema } from "@/lib/validators/signupSchema";

import { signupAction } from "../actions";

type SignInputs = {
  email: string;
  password: string;
};

const AddNewDoctor = () => {
  const [state, dispatch, isPending] = useActionState(signupAction, undefined);

  const [validationErrors, setValidationErrors] = useState<
    Partial<SignInputs> | undefined
  >();

  const { email: emailError = "", password: passwordError = "" } =
    validationErrors
      ? validationErrors
      : { email: state?.error?.email, password: state?.error?.password };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const validation = signupSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      setValidationErrors({
        email: z.treeifyError(validation.error).properties?.email?.errors[0],
        password: z.treeifyError(validation.error).properties?.password
          ?.errors[0],
      });
      e.preventDefault();
    }
  };

  const onSuccess = useEffectEvent(() => {
    if (state?.success?.msg) {
      toast.success(state.success.msg);
    }
  });

  useEffect(() => {
    onSuccess();
  }, [state]);

  return (
    <div className="bg-secondary w-full max-w-sm space-y-2 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">Add New Doctor</h3>
      <Separator />
      <form action={dispatch} onSubmit={handleSubmit}>
        <FieldGroup className="flex flex-col gap-3">
          <Field data-invalid={emailError} className="grid gap-1">
            <FieldLabel htmlFor="email">email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              aria-invalid={Boolean(emailError)}
              className="bg-background"
            />
            {emailError !== "" && <FieldError>{emailError}</FieldError>}
          </Field>
          <Field className="grid gap-1">
            <FieldLabel htmlFor="password">{"password"}</FieldLabel>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className="bg-background"
            />
            {passwordError !== "" && <FieldError>{passwordError}</FieldError>}
          </Field>
        </FieldGroup>
        <Button
          loading={isPending}
          disabled={isPending}
          type="submit"
          className="mt-5 w-full"
        >
          {"add new doctor"}
        </Button>
      </form>
    </div>
  );
};

export default AddNewDoctor;
