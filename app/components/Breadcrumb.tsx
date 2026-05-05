import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import {
  Breadcrumb as BC,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type IProps = {
  pages: { name: string; href: string }[];
  current: string;
};

export default function Breadcrumb({ pages = [], current }: IProps) {
  return (
    <BC>
      <BreadcrumbList>
        {pages.map((page, i) => (
          <Fragment key={i}>
            <BreadcrumbItem className="capitalize">
              <BreadcrumbLink asChild>
                <Link href={page.href}>{page.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BC>
  );
}
