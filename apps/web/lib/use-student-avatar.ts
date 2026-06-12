"use client";

import { useMemo } from "react";
import { getVerifiedHours } from "@/lib/compliance";
import {
  getHighestUnlockedHat,
  isHatUnlocked,
  normalizeAvatarConfig,
} from "@/lib/avatar";
import { useProfileStore } from "@/lib/profile-store";
import { useStudentData } from "@/lib/student-data";
import type { AvatarConfig } from "@/lib/types/student";

export function useStudentAvatar(): AvatarConfig {
  const { avatar } = useProfileStore();
  const { hoursLog } = useStudentData();
  const verifiedHours = getVerifiedHours(hoursLog);
  const normalized = normalizeAvatarConfig(avatar);

  return useMemo(() => {
    if (isHatUnlocked(normalized.hat, verifiedHours)) {
      return normalized;
    }
    return { ...normalized, hat: getHighestUnlockedHat(verifiedHours) };
  }, [normalized, verifiedHours]);
}
