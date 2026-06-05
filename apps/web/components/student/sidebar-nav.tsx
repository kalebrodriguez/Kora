"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleGauge,
  CalendarSearch,
  Clock,
  Target,
  Building2,
} from "lucide-react";

const nav = [
  { icon: CircleGauge, label: "Dashboard", href: "/" },
  { icon: CalendarSearch, label: "Events", href: "/events" },
  { icon: Clock, label: "My Hours", href: "/hours" },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: Building2, label: "Organizations", href: "/organizations" },
];

const SIDEBAR_EASE =
  "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

function sidebarFade(collapsed: boolean) {
  return collapsed
    ? "max-w-0 opacity-0 delay-0 duration-300 ease-in"
    : "max-w-[200px] opacity-100 delay-100 duration-500 ease-out";
}

export function SidebarNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {nav.map(({ icon: Icon, label, href }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={label}
            href={href}
            title={collapsed ? label : undefined}
            className={`group flex items-center rounded-chip py-2.5 text-[15px] font-medium transition-all ${SIDEBAR_EASE} ${
              collapsed ? "justify-center px-2.5" : "gap-3 px-3"
            } ${
              active
                ? "bg-accent-lavender text-ink"
                : "text-muted hover:bg-accent-lavender/50 hover:text-ink"
            }`}
          >
            <Icon
              size={20}
              strokeWidth={2.2}
              className={`shrink-0 ${
                active ? "text-primary" : "text-muted group-hover:text-primary"
              }`}
            />
            <span
              className={`inline-block overflow-hidden whitespace-nowrap transition-[max-width,opacity] ${sidebarFade(collapsed)}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
