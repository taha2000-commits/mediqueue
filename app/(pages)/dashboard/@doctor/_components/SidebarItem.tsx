"use client";

import {
  CalendarDays,
  ChevronDown,
  ClockAlert,
  Cog,
  Home,
  Logs,
  LucideIcon,
  TimerReset,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type Item = {
  text: string;
  href: string;
};

type SidebarItemData = Item & {
  index: number;
  sub?: Item[];
};

interface SidebarItemProps {
  item: SidebarItemData;
}

const sidebarIcons: LucideIcon[] = [
  Home,
  ClockAlert,
  CalendarDays,
  UserRound,
  Logs,
  TimerReset,
  Cog,
];

export default function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const search_params = useSearchParams();
  const { href, text, index, sub = [] } = item;

  const isSubItemActive = sub.some((subItem) => pathname === subItem.href);

  const [open, setOpen] = useState(isSubItemActive);

  const hasSubMenu = sub.length > 0;

  const Icon = sidebarIcons[index];

  const isActive = useMemo(() => {
    return (
      pathname === href || sub.some((subItem) => pathname === subItem.href)
    );
  }, [href, pathname, sub]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        variant="outline"
        data-active={isActive}
        className="capitalize"
        onClick={() => {
          if (hasSubMenu) {
            setOpen((prev) => !prev);
          }
        }}
      >
        {!hasSubMenu ? (
          <Link href={href} className="flex flex-1 items-center gap-2">
            <Icon className="size-4" />
            <span>{text}</span>
          </Link>
        ) : (
          <>
            <Icon className="size-4" />

            <span>{text}</span>
            <ChevronDown
              className={cn(
                "ml-auto transition-transform",
                open && "rotate-180",
              )}
            />
          </>
        )}
      </SidebarMenuButton>

      {hasSubMenu && open && (
        <SidebarMenuSub>
          {sub.map((subItem) => {
            const { searchParams } = new URL(
              "http://localhost:3000" + subItem.href,
            );
            const isSelected =
              search_params.size > 0 &&
              searchParams.size > 0 &&
              search_params.get("type") == searchParams.get("type") &&
              search_params.get("status") == searchParams.get("status");

            const dataActive =
              search_params.size > 0 ? isSelected : pathname === subItem.href;
            return (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton
                  asChild
                  data-active={dataActive}
                  className="capitalize"
                >
                  <Link href={subItem.href} className="flex items-center gap-2">
                    <Icon className="size-4" />

                    <span>{subItem.text}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
