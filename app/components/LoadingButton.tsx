import { Check } from "lucide-react";
import React, { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
type LoadingButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
  showCheck?: boolean;
  error?: boolean;
};
const LoadingButton = (props: LoadingButtonProps) => {
  const { loading, showCheck, children, className, error, ...btnProps } = props;
  const buttonClassName = cn(className, {
    "bg-green-500": showCheck,
  });
  return (
    <Button
      {...btnProps}
      className={buttonClassName}
      variant={error ? "destructive" : "default"}
    >
      {showCheck ? (
        <Check className="transition-all duration-200" />
      ) : loading ? (
        <Spinner />
      ) : null}
      {children}
    </Button>
  );
};

export default LoadingButton;
