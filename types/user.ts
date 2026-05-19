import { UserRole } from "./user-role";

type UserMetadata = {
  full_name?: string;
  phone?: string;
  role?: UserRole;
  avatar_url?: string;
};

export type User = {
  id: string;
  email: string;
  user_metadata?: UserMetadata;
};
