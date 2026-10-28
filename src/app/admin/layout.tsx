import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      {session && <AdminNav session={session} />}
      <div className="mx-auto min-h-[50vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">{children}</div>
    </>
  );
}
