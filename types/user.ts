import { UserRole } from "./user-role";

type UserMetadata = {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  userRole?: UserRole;
};

export type User = {
  id: string;
  email: string;
  user_metadata?: UserMetadata;
};
