import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { getModeratorContext } from "@kora/db";
import { logout } from "@/app/login/actions";
import { requireRole } from "@/lib/auth/session";

export default async function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole("ORG_MODERATOR");
  const context = await getModeratorContext(user.id);

  if (!context) {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas text-ink">
        <p className="text-muted">No organization is linked to this account.</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-black/5 bg-surface">
        <div className="mx-auto flex max-w-shell items-center gap-4 px-8 py-4">
          <Link href="/org" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-chip bg-primary text-lg font-bold text-white">
              K
            </span>
            <span>
              <span className="flex items-center gap-1.5 text-[16px] font-bold">
                {context.org.name}
                {context.org.verified ? (
                  <ShieldCheck size={16} className="text-primary" />
                ) : null}
              </span>
              <span className="block text-[12px] text-muted">
                Organization portal
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-[14px] font-semibold">
                {context.moderator.name}
              </p>
              <p className="text-[12px] text-muted">
                {context.moderator.roleTitle}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={context.moderator.avatar}
              alt=""
              className="h-10 w-10 rounded-full bg-accent-lavender"
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
