import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import PatientsMenubar from "../_components/PatientsMenubar";

type PatientsLayoutProps = LayoutProps<"/dashboard/patients/[type]">;

export async function generateMetadata(
  { params }: PatientsLayoutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { type } = await params;
  const parentMetadata = await parent;
  return {
    title: `${type.capitalize()} Patients`,
    description: `View and manage ${type} patients records, appointments, and medical information بسهولة من خلال منصة MediQueue لإدارة العيادات والأطباء في مصر.`,
    keywords: parentMetadata.keywords
      ? [
          ...parentMetadata.keywords,
          `${type} patients`,
          `manage ${type} patients`,
        ]
      : [`${type} patients`, `manage ${type} patients`],
  };
}

type ValidTabType = "active" | "new" | "returning";
const validTabs: ValidTabType[] = ["active", "new", "returning"];
const layout = async ({ children, params }: PatientsLayoutProps) => {
  const { type } = await params;
  if (!type || !validTabs.includes(type as ValidTabType)) return notFound();
  return (
    <>
      <div className="bg-second-background h-fit flex-1 rounded-xl p-4 shadow">
        <PatientsMenubar selected={type} />
        {children}
      </div>
    </>
  );
};

export default layout;
