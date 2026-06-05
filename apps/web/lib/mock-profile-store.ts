"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_AVATAR_CONFIG, normalizeAvatarConfig } from "@/lib/avatar";
import { student } from "@/lib/mock-data";
import type { AvatarConfig } from "@/lib/types/student";

const STORAGE_KEY = "kora-profile-store-v1";

interface ProfileState {
  avatar: AvatarConfig;
  skills: string[];
}

function getInitialState(): ProfileState {
  return {
    avatar: { ...DEFAULT_AVATAR_CONFIG },
    skills: [...student.skills],
  };
}

function normalizeState(raw: Partial<ProfileState> | null): ProfileState {
  const initial = getInitialState();
  if (!raw) {
    return initial;
  }

  return {
    avatar: normalizeAvatarConfig(raw.avatar),
    skills: Array.isArray(raw.skills)
      ? raw.skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean)
      : initial.skills,
  };
}

function loadState(): ProfileState {
  if (typeof window === "undefined") {
    return getInitialState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialState();
    }
    return normalizeState(JSON.parse(raw) as Partial<ProfileState>);
  } catch {
    return getInitialState();
  }
}

function saveState(state: ProfileState): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = getInitialState();
const listeners = new Set<() => void>();
let hydrated = false;

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function ensureHydrated(): void {
  if (hydrated || typeof window === "undefined") {
    return;
  }
  state = loadState();
  hydrated = true;
}

function getSnapshot(): ProfileState {
  ensureHydrated();
  return state;
}

function getServerSnapshot(): ProfileState {
  return getInitialState();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function persist(next: ProfileState): void {
  state = next;
  saveState(next);
  emitChange();
}

export function useProfileStore() {
  const profile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setAvatar = useCallback((avatar: AvatarConfig) => {
    persist({ ...getSnapshot(), avatar: normalizeAvatarConfig(avatar) });
  }, []);

  const updateAvatar = useCallback((patch: Partial<AvatarConfig>) => {
    const current = getSnapshot();
    persist({
      ...current,
      avatar: normalizeAvatarConfig({ ...current.avatar, ...patch }),
    });
  }, []);

  const setSkills = useCallback((skills: string[]) => {
    persist({
      ...getSnapshot(),
      skills: skills.map((skill) => skill.trim().toLowerCase()).filter(Boolean),
    });
  }, []);

  const addSkill = useCallback((skill: string) => {
    const trimmed = skill.trim().toLowerCase();
    if (!trimmed) {
      return false;
    }
    const current = getSnapshot();
    if (current.skills.includes(trimmed)) {
      return false;
    }
    persist({ ...current, skills: [...current.skills, trimmed] });
    return true;
  }, []);

  const removeSkill = useCallback((skill: string) => {
    const trimmed = skill.trim().toLowerCase();
    const current = getSnapshot();
    persist({
      ...current,
      skills: current.skills.filter((item) => item !== trimmed),
    });
  }, []);

  const toggleSkill = useCallback((skill: string) => {
    const trimmed = skill.trim().toLowerCase();
    if (!trimmed) {
      return;
    }
    const current = getSnapshot();
    if (current.skills.includes(trimmed)) {
      persist({
        ...current,
        skills: current.skills.filter((item) => item !== trimmed),
      });
      return;
    }
    persist({ ...current, skills: [...current.skills, trimmed] });
  }, []);

  const hasSkill = useCallback((skill: string) => {
    return getSnapshot().skills.includes(skill.trim().toLowerCase());
  }, []);

  return {
    avatar: profile.avatar,
    skills: profile.skills,
    setAvatar,
    updateAvatar,
    setSkills,
    addSkill,
    removeSkill,
    toggleSkill,
    hasSkill,
  };
}
