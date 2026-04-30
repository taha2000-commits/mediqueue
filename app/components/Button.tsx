"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
type Props = {
  children: string | ReactNode[];
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "PRIMARY" | "SECONDARY";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};
const Button = ({
  children,
  className,
  type,
  variant = "PRIMARY",
  disabled = false,
  onClick = () => {},
  loading=false,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "text-tertiary flex items-center justify-center gap-1 rounded-lg px-4 py-2",
        variant === "SECONDARY"
          ? "border-tertiary border"
          : "bg-primary text-white/90",
        className,
      )}
      onClick={onClick}
    >
      {children}
      {loading && <Spinner />}
    </button>
  );
};

export default Button;
