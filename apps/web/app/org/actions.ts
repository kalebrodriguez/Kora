"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createQrSessionRecord,
  createShift,
  flagShiftLogById,
  verifyShiftLogById,
  type CategoryKey,
} from "@kora/db";
import { getSession } from "@/lib/auth/session";
import { generateShiftQrToken } from "@/lib/qr-token";

async function requireModeratorId(): Promise<string> {
  const session = await getSession();
  if (!session || session.role !== "ORG_MODERATOR") {
    throw new Error("Sign in as an organization moderator to do that.");
  }
  return session.userId;
}

/** Issue a fresh HMAC-signed check-in code for one of this org's shifts. */
export async function generateQrAction(shiftId: string): Promise<void> {
  const moderatorId = await requireModeratorId();
  const { token, expiresAt, issuedAt } = generateShiftQrToken(shiftId);
  await createQrSessionRecord(moderatorId, shiftId, token, issuedAt, expiresAt);
  revalidatePath("/org", "layout");
  revalidatePath("/log-hours");
}

export interface CreateShiftState {
  error: string | null;
}

const CATEGORY_KEYS: CategoryKey[] = ["community", "environment", "education"];

export async function createShiftAction(
  _prev: CreateShiftState,
  formData: FormData,
): Promise<CreateShiftState> {
  const moderatorId = await requireModeratorId();

  const categoryKey = String(formData.get("categoryKey") ?? "");
  if (!CATEGORY_KEYS.includes(categoryKey as CategoryKey)) {
    return { error: "Pick a category." };
  }

  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const scheduledAt = new Date(`${date}T${time || "09:00"}`);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { error: "Enter a valid date and time." };
  }

  try {
    await createShift(moderatorId, {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      categoryKey: categoryKey as CategoryKey,
      scheduledAt,
      durationHrs: Number(formData.get("durationHrs") ?? 0),
      slots: Number(formData.get("slots") ?? 0),
      skills: String(formData.get("skills") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      img: String(formData.get("img") ?? "") || undefined,
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not create shift." };
  }

  revalidatePath("/", "layout");
  redirect("/org");
}

export async function verifyLogAction(logId: string): Promise<void> {
  const moderatorId = await requireModeratorId();
  await verifyShiftLogById(logId, moderatorId);
  revalidatePath("/org", "layout");
}

export async function flagLogAction(logId: string): Promise<void> {
  const moderatorId = await requireModeratorId();
  await flagShiftLogById(logId, moderatorId);
  revalidatePath("/org", "layout");
}
