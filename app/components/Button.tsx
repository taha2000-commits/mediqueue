"use client";
import Link from "next/link";
import { ButtonHTMLAttributes, Fragment, PropsWithChildren } from "react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "PRIMARY" | "SECONDARY";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  asLink?: boolean;
  href?: string;
} & PropsWithChildren;

const Button = ({
  children,
  className,
  type,
  variant = "PRIMARY",
  disabled = false,
  onClick = () => {},
  loading = false,
  asLink = false,
  href = "",
}: Props) => {
  const styleClasses = cn(
    "text-tertiary capitalize flex items-center justify-center gap-1 rounded-lg px-4 py-2",
    variant === "SECONDARY"
      ? "border-tertiary border"
      : "bg-primary text-white/90",
    className,
  );
  return (
    <Fragment>
      {asLink ? (
        <Link href={href} className={styleClasses}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          className={styleClasses}
          onClick={onClick}
        >
          {children}
          {loading && <Spinner />}
        </button>
      )}
    </Fragment>
  );
};

export default Button;
