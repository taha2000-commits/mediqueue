"use client";
import Button from "@/app/components/Button";
import { api } from "@/lib/axios/instance";
import { UserRole } from "@/types/user-role";

const page = () => {
  const click = async () => {
    await api.post("/auth/signup", {
      email: "tahamahmoudai@gmail.com",
      password: "taha1234",
      role: UserRole.Doctor,
    });
  };
  return (
    <div>
      signup page
      <Button
        onClick={() => {
          click();
        }}
      >
        Signup
      </Button>
    </div>
  );
};

export default page;
