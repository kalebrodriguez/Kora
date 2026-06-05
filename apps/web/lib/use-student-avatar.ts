"use client";

import { useMemo } from "react";
import { getVerifiedHours } from "@/lib/compliance";
import {
  getHighestUnlockedHat,
  isHatUnlocked,
  normalizeAvatarConfig,
} from "@/lib/avatar";
import { hoursLog } from "@/lib/mock-data";
import { useProfileStore } from "@/lib/mock-profile-store";
import type { AvatarConfig } from "@/lib/types/student";

export function useStudentAvatar(): AvatarConfig {
  const { avatar } = useProfileStore();
  const verifiedHours = getVerifiedHours(hoursLog);
  const normalized = normalizeAvatarConfig(avatar);

  return useMemo(() => {
    if (isHatUnlocked(normalized.hat, verifiedHours)) {
      return normalized;
    }
    return { ...normalized, hat: getHighestUnlockedHat(verifiedHours) };
  }, [normalized, verifiedHours]);
}
