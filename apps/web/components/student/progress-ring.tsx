"use client";

import { getGraduationRequirement } from "@/lib/compliance";
import { student } from "@/lib/mock-data";
import { useStudentAvatar } from "@/lib/use-student-avatar";
import { StudentAvatar } from "@/components/student/student-avatar";

interface ProgressRingProps {
  hoursLogged?: number;
  hoursRequired?: number;
  size?: "default" | "compact";
}

export function ProgressRing({
  hoursLogged = student.hoursLogged,
  hoursRequired = getGraduationRequirement(student.schoolState),
  size = "default",
}: ProgressRingProps) {
  const avatar = useStudentAvatar();
  const pct = Math.round((hoursLogged / hoursRequired) * 100);
  const ringSize = size === "compact" ? 108 : 150;
  const avatarSize = size === "compact" ? 78 : 110;
  const stroke = size === "compact" ? 6 : 8;
  const r = (ringSize - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="relative grid shrink-0 place-items-center">
      <svg width={ringSize} height={ringSize} className="-rotate-90">
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={r}
          fill="none"
          stroke="var(--color-chart-track)"
          strokeWidth={stroke}
        />
        <circle
          cx={ringSize / 2}
          cy={ringSize / 2}
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>

      <StudentAvatar
        config={avatar}
        size={avatarSize}
        className="absolute rounded-full bg-accent-lavender"
      />

      <span
        className={`absolute rounded-pill bg-primary font-bold text-white shadow-raised ${
          size === "compact"
            ? "right-0 top-1 px-2 py-0.5 text-[10px]"
            : "right-1 top-2 px-2.5 py-1 text-[12px]"
        }`}
      >
        {pct}%
      </span>
    </div>
  );
}
