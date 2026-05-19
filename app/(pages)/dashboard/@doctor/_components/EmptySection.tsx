import { ClipboardClock, LucideIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface IProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}
export default function EmptySection({ title, description, icon }: IProps) {
  const Icon = icon ?? ClipboardClock;
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{<Icon />}</EmptyMedia>
        <EmptyTitle className="normal-case">{title}</EmptyTitle>
        <EmptyDescription className="normal-case">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
