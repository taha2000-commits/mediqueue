"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useShowSuccessIcon } from "@/hooks/useShowSuccessIcon";
import logout from "@/lib/auth/logout";

import LoadingButton from "./LoadingButton";

const LogoutBtn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isShow, setIsShow } = useShowSuccessIcon();

  const onLogout = async () => {
    setIsLoading(true);
    const { error } = await logout();
    if (error) {
      toast.error(error.message);
      setIsError(true);
    } else {
      toast.success("You have been logged out.");
      setIsShow(true);
      setIsError(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <LoadingButton
      showCheck={isShow}
      error={isError}
      loading={isLoading}
      onClick={onLogout}
    >
      Logout
    </LoadingButton>
  );
};

export default LogoutBtn;
