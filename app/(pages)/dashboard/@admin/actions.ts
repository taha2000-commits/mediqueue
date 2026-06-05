import { signup } from "@/lib/auth/signup";
import { UserRole } from "@/types/user-role";

export const signupAction = async (
  _:
    | {
        error?: { message?: string; email?: string; password?: string };
        success?: { msg?: string };
      }
    | undefined,
  formData: FormData,
) => {
  const email = formData.get("email")?.toString();

  const password = formData.get("password")?.toString();

  if (!email || !password) return;

  const { error } = await signup({
    email,
    password,
    role: UserRole.Doctor,
  });

  if (error) {
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
  } else {
    return {
      success: {
        msg: "Doctor added successfully and verification mail sent to him",
      },
    };
  }
};
