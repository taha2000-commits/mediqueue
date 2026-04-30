"use client";
import { AlertTriangleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitEventHandler, useActionState, useState } from "react";
import z from "zod";

import Button from "@/app/components/Button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validators/loginSchema";

import loginAction from "./actions";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const t = useTranslations("LoginPage");
  const [state, dispatch, isPending] = useActionState(loginAction, undefined);

  const [validationErrors, setValidationErrors] = useState<
    Partial<LoginInputs> | undefined
  >();

  const { email: emailError = "", password: passwordError = "" } =
    validationErrors
      ? validationErrors
      : { email: state?.error?.email, password: state?.error?.password };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      setValidationErrors({
        email: z.treeifyError(validation.error).properties?.email?.errors[0]
          ? "invalidEmailFormat"
          : "",
        password: z.treeifyError(validation.error).properties?.password
          ?.errors[0]
          ? "passwordMinLength"
          : "",
      });
      e.preventDefault();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-74px)] items-center justify-center">
      <Card className="w-full max-w-sm gap-0">
        <CardHeader className="mb-3">
          <CardTitle className="text-2xl font-bold ">
            {t("loginTitle")}
          </CardTitle>
          <CardDescription>{t("loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="mb-3">
          {state?.error?.message && (
            <Alert className="mb-2 max-w-md border-amber-200 bg-amber-50 p-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
              <AlertTriangleIcon />
              <AlertTitle>{t(state?.error?.message)}</AlertTitle>
            </Alert>
          )}
          <form action={dispatch} onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col gap-3">
              <Field data-invalid={emailError} className="grid gap-1">
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-invalid={Boolean(emailError)}
                />
                {emailError !== "" && <FieldError>{t(emailError)}</FieldError>}
              </Field>
              <Field className="grid gap-1">
                <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                <Input id="password" type="password" name="password" required />
                {passwordError !== "" && (
                  <FieldError>{t(passwordError)}</FieldError>
                )}
              </Field>
            </FieldGroup>
            <Button
              loading={isPending}
              disabled={isPending}
              type="submit"
              className="mt-5 w-full"
            >
              {t("login")}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="SECONDARY" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
