"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Settings, LogOut, Sparkles, PanelLeftClose, PanelLeft } from "lucide-react";
import { SidebarNav } from "@/components/student/sidebar-nav";
import { SidebarMessagesSection } from "@/components/student/sidebar-messages-section";

const STORAGE_KEY = "kora-sidebar-collapsed";

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

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setCollapsed(true);
    setMounted(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <aside
      className={`relative sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden bg-surface py-7 transition-[width,padding] ${SIDEBAR_EASE} lg:flex ${
        collapsed ? "w-[76px] px-3" : "w-[244px] px-6"
      } ${mounted ? "" : "w-[244px] px-6"}`}
    >
      <div
        className={`mb-2 flex transition-all ${SIDEBAR_EASE} ${
          collapsed
            ? "w-full flex-col gap-1"
            : "flex-row items-center justify-between gap-2 px-1"
        }`}
      >
        <div
          className={`flex items-center transition-all ${SIDEBAR_EASE} ${
            collapsed
              ? "w-full justify-center gap-0 px-2.5 py-2.5"
              : "shrink-0 gap-2.5"
          }`}
        >
          {collapsed ? (
            <Sparkles
              size={20}
              strokeWidth={2.2}
              className="shrink-0 text-primary"
            />
          ) : (
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-raised">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
          )}
          <span
            className={`inline-block overflow-hidden whitespace-nowrap text-[20px] font-extrabold tracking-tight transition-[max-width,opacity,margin] ${sidebarFade(
              collapsed,
            )} ${collapsed ? "ml-0" : ""}`}
          >
            Kora
          </span>
        </div>

        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`relative shrink-0 place-items-center rounded-chip text-muted transition-all ${SIDEBAR_EASE} hover:bg-accent-lavender/50 hover:text-ink ${
            collapsed
              ? "flex w-full justify-center px-2.5 py-2.5"
              : "grid h-8 w-8"
          }`}
        >
          <PanelLeftClose
            size={18}
            strokeWidth={2.2}
            className={`absolute transition-all duration-300 ease-in-out ${
              collapsed
                ? "scale-75 opacity-0"
                : "scale-100 opacity-100"
            }`}
          />
          <PanelLeft
            size={18}
            strokeWidth={2.2}
            className={`absolute transition-all duration-300 ease-in-out ${
              collapsed
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      <SectionLabel collapsed={collapsed}>Overview</SectionLabel>
      <SidebarNav collapsed={collapsed} />

      <SidebarMessagesSection collapsed={collapsed} />

      <div className="mt-auto">
        <SectionLabel collapsed={collapsed}>Settings</SectionLabel>
        <Link
          href="#"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center rounded-chip py-2.5 text-[15px] font-medium text-muted transition-all ${SIDEBAR_EASE} hover:bg-accent-lavender/50 hover:text-ink ${
            collapsed ? "justify-center px-2.5" : "gap-3 px-3"
          }`}
        >
          <Settings size={20} strokeWidth={2.2} className="shrink-0" />
          <span
            className={`inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] ${sidebarFade(collapsed)}`}
          >
            Settings
          </span>
        </Link>
        <Link
          href="#"
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center rounded-chip py-2.5 text-[15px] font-semibold text-danger transition-all ${SIDEBAR_EASE} hover:bg-danger/10 ${
            collapsed ? "justify-center px-2.5" : "gap-3 px-3"
          }`}
        >
          <LogOut size={20} strokeWidth={2.2} className="shrink-0" />
          <span
            className={`inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] ${sidebarFade(collapsed)}`}
          >
            Logout
          </span>
        </Link>
      </div>
    </aside>
  );
}
