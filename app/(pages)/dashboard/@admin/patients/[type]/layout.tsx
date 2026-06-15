import { Metadata } from "next";
import { notFound } from "next/navigation";

type PatientsLayoutProps = LayoutProps<"/dashboard/patients/[type]">;

export async function generateMetadata({
  params,
}: PageProps<"/dashboard/patients/[type]">): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${type.capitalize()} Patients`,
  };
}

type ValidTabType = "active" | "new" | "returning";
const validTabs: ValidTabType[] = ["active", "new", "returning"];
const layout = async ({ children, params }: PatientsLayoutProps) => {
  const { type } = await params;
  if (!type || !validTabs.includes(type as ValidTabType)) return notFound();
  return children;
};

export default layout;
