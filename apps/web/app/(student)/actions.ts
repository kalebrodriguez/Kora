"use server";

import { revalidatePath } from "next/cache";
import {
  commitToShift,
  markAllNotificationsRead,
  markNotificationRead,
  toggleFollowOrg,
  toggleSavedShift,
  updateUserSkills,
} from "@kora/db";
import { getSession } from "@/lib/auth/session";

async function requireStudentId(): Promise<string> {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") {
    throw new Error("Sign in as a student to do that.");
  }
  return session.userId;
}

export async function commitToShiftAction(
  shiftId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const userId = await requireStudentId();
  const result = await commitToShift(userId, shiftId);
  revalidatePath("/", "layout");
  return result;
}

export async function toggleSavedShiftAction(shiftId: string): Promise<boolean> {
  const userId = await requireStudentId();
  const saved = await toggleSavedShift(userId, shiftId);
  revalidatePath("/", "layout");
  return saved;
}

export async function toggleFollowOrgAction(orgId: string): Promise<boolean> {
  const userId = await requireStudentId();
  const following = await toggleFollowOrg(userId, orgId);
  revalidatePath("/", "layout");
  return following;
}

export async function markNotificationReadAction(
  notificationId: string,
): Promise<void> {
  const userId = await requireStudentId();
  await markNotificationRead(userId, notificationId);
  revalidatePath("/", "layout");
}

export async function markAllNotificationsReadAction(): Promise<void> {
  const userId = await requireStudentId();
  await markAllNotificationsRead(userId);
  revalidatePath("/", "layout");
}

export async function updateSkillsAction(skills: string[]): Promise<void> {
  const userId = await requireStudentId();
  await updateUserSkills(userId, skills);
  revalidatePath("/", "layout");
}
