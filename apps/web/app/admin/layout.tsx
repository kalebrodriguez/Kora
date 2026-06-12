import Link from "next/link";
import { LogOut, School } from "lucide-react";
import { getAdminContext } from "@kora/db";
import { logout } from "@/app/login/actions";
import { requireRole } from "@/lib/auth/session";

export const metadata = {
  title: "Kora — Admin Console",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole("SCHOOL_ADMIN");
  const context = await getAdminContext(user.id);

  if (!context) {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas text-ink">
        <p className="text-muted">No school is linked to this account.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-black/5 bg-surface">
        <div className="mx-auto flex max-w-shell items-center gap-4 px-8 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-chip bg-ink-button text-lg font-bold text-white">
              K
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-[16px] font-bold">
                {context.school.name}
                <School size={16} className="text-primary" />
              </span>
              <span className="block text-[12px] text-muted">
                Admin console · {context.school.state}
                {context.school.district ? ` · ${context.school.district}` : ""}
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-[14px] font-semibold">{context.admin.name}</p>
              <p className="text-[12px] text-muted">School administrator</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={context.admin.avatar}
              alt=""
              className="h-10 w-10 rounded-full bg-accent-sky"
            />
            <form action={logout}>
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-accent-lavender text-muted transition hover:bg-danger hover:text-white"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-shell px-8 py-8">{children}</main>
    </div>
  );
}
