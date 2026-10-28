"use client";

import { usePathname } from "next/navigation";

export function PublicSiteShell({
  announcementBar,
  header,
  footer,
  floatingActions,
  children,
}: {
  announcementBar: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  floatingActions: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && announcementBar}
      {header}
      {children}
      {footer}
      {!isAdmin && floatingActions}
    </>
  );
}
