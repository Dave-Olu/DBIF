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
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8">{children}</div>
    </>
  );
}
