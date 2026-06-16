import { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipComponent = ({
  content,
  element,
  active = true,
}: {
  element: string | ReactNode;
  content?: string | ReactNode;
  active?: boolean;
}) => {
  if (!active) return element;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{element}</TooltipTrigger>
      <TooltipContent className="normal-case">{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
