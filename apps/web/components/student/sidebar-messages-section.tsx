"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { getSidebarPreviewThreads, hasUnreadMessages } from "@/lib/messages";
import { useMessagesStore } from "@/lib/messages-store";

const SIDEBAR_EASE =
  "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

function sidebarFade(collapsed: boolean) {
  return collapsed
    ? "max-w-0 opacity-0 delay-0 duration-300 ease-in"
    : "max-w-[200px] opacity-100 delay-100 duration-500 ease-out";
}

function SectionLabel({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <p
      className={`overflow-hidden px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted transition-all ${SIDEBAR_EASE} ${
        collapsed
          ? "mb-0 mt-0 max-h-0 opacity-0"
          : "mb-3 mt-7 max-h-6 opacity-100"
      }`}
    >
      {children}
    </p>
  );
}

export function SidebarMessagesSection({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const { threads, markRead } = useMessagesStore();
  const previewThreads = getSidebarPreviewThreads(threads);
  const active = pathname.startsWith("/messages");
  const unread = hasUnreadMessages(threads);

  return (
    <>
      <SectionLabel collapsed={collapsed}>Messages</SectionLabel>
      <Link
        href="/messages"
        title={collapsed ? "Messages" : undefined}
        className={`relative mb-3 flex items-center rounded-chip py-2.5 text-[15px] font-medium transition-all ${SIDEBAR_EASE} ${
          collapsed ? "justify-center px-2.5" : "gap-3 px-3"
        } ${
          active
            ? "bg-accent-lavender text-ink"
            : "text-muted hover:bg-accent-lavender/50 hover:text-ink"
        }`}
      >
        <Mail
          size={20}
          strokeWidth={2.2}
          className={`shrink-0 ${
            active ? "text-primary" : "text-muted group-hover:text-primary"
          }`}
        />
        <span
          className={`inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] ${sidebarFade(collapsed)}`}
        >
          Messages
        </span>
        {unread ? (
          <span
            className={`h-2 w-2 shrink-0 rounded-full bg-primary transition-all ${SIDEBAR_EASE} ${
              collapsed ? "absolute right-2 top-2" : "ml-auto"
            }`}
          />
        ) : null}
      </Link>

      <div
        className={`flex flex-col gap-3 overflow-hidden px-1 transition-all ${SIDEBAR_EASE} ${
          collapsed
            ? "pointer-events-none max-h-0 opacity-0"
            : "max-h-[480px] opacity-100"
        }`}
      >
        {previewThreads.map((thread) => (
          <Link
            key={thread.id}
            href={`/messages?thread=${thread.id}`}
            onClick={() => markRead(thread.id)}
            className="flex items-center gap-3 rounded-chip px-1 py-1 transition hover:bg-accent-lavender/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thread.contactAvatar}
              alt=""
              className="h-9 w-9 rounded-full bg-accent-lavender object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[14px] font-semibold">
                  {thread.contactName}
                </p>
                {thread.unread ? (
                  <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-primary" />
                ) : null}
              </div>
              <p className="truncate text-[12px] text-muted">
                {thread.kind === "moderator" && thread.shiftTitle
                  ? thread.shiftTitle
                  : thread.contactSubtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
