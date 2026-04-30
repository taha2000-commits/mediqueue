"use server";
import { UserRole } from "@/types/user-role";

import { createClient } from "../supabase/client";

export const signup = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: UserRole;
}) => {
  const supabase = await createClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userRole: role,
      },
    },
  });
};
