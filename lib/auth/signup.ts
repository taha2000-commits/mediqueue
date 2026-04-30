"use server";
import { UserRole } from "@/types/user-role";

import { supabase } from "../supabase/client";

export const signup = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: UserRole;
}) => {
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
