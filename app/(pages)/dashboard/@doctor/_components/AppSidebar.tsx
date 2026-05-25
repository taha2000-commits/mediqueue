import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Matemasie_Font } from "@/i18n/fonts";
import { UserRole } from "@/types/user-role";

import SidebarItem from "./SidebarItem";
type Item = {
  text: string;
  href: string;
};

const adminSidebarItems: (Item & { sub?: Item[] })[] = [
  {
    text: "dashboard",
    href: "/dashboard",
  },
  {
    text: "doctors",
    href: "/dashboard/doctors",
  },
];

const sidebarItems: (Item & { sub?: Item[] })[] = [
  {
    text: "dashboard",
    href: "/dashboard",
  },
  {
    text: "requests",
    href: "/dashboard/requests",
  },
  {
    text: "appointments",
    href: "/dashboard/appointments",
    sub: [
      { href: "/dashboard/appointments", text: "all appointments" },
      { href: "/dashboard/appointments/pending", text: "pending" },
      { href: "/dashboard/appointments/rejected", text: "rejected" },
      { href: "/dashboard/appointments/accepted", text: "responded" },
      { href: "/dashboard/appointments/cancelled", text: "cancelled" },
      { href: "/dashboard/appointments/expired", text: "expired" },
    ],
  },
  {
    text: "patients",
    href: "/dashboard/patients",
    sub: [
      { href: "/dashboard/patients", text: "all patients" },
      { href: "/dashboard/patients/active", text: "active" },
      { href: "/dashboard/patients/new", text: "new" },
      { href: "/dashboard/patients/returning", text: "returning" },
    ],
  },
  {
    text: "queue",
    href: "/dashboard/queue",
  },
  {
    text: "availability",
    href: "/dashboard/availability",
  },
  {
    text: "settings",
    href: "/dashboard/settings",
  },
];

export async function AppSidebar({ role }: { role: UserRole }) {
  const items = role == UserRole.Doctor ? sidebarItems : adminSidebarItems;
  return (
    <Sidebar>
      <SidebarHeader className="pt-3">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <div className="">
            <Image
              src={"/icon-192.png"}
              alt="Logo"
              width={50}
              height={50}
              className="aspect-square h-full"
            />
          </div>
          <div className="leading-0.5">
            <h4 className={`text-2xl ${Matemasie_Font.className}`}>
              MediQueue
            </h4>
            <span className="text-foreground/50 text-xs capitalize">
              Your health our priority
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item, indx) => (
              <SidebarItem key={indx} item={{ ...item, index: indx }} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2 pb-5">
          {/* <Avatar size="lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${doctor.avatar}`}
              alt={doctor.name_en}
              width={52}
              height={52}
            />
          </Avatar>
          <div className="">
            <h6 className="text-sm">{doctor.name_en}</h6>
            <p className="text-muted-foreground text-xs">
              {doctor.specialization_en}
            </p>
          </div> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
