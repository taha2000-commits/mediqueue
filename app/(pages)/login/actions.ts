"use server";

import { redirect } from "next/navigation";

import { login } from "@/lib/auth/login";

export default async function loginAction(
  _:
    | { error?: { message?: string; email?: string; password?: string } }
    | undefined,
  formData: FormData,
) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) return;

  const { error } = await login({
    email,
    password,
  });

  if (error) {
    console.log(error);

    return {
      error: {
        message:
          error.code == "invalid_credentials"
            ? "invalidCredentials"
            : error.message,
        email: "",
        password: "",
      },
    };
  }

  redirect("/dashboard");
}
