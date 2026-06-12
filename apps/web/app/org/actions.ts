"use server";

import { revalidatePath } from "next/cache";
import {
  createQrSessionRecord,
  flagShiftLogById,
  verifyShiftLogById,
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
