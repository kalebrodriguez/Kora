"use server";

import { revalidatePath } from "next/cache";
import { findQrSession, redeemQrSession } from "@kora/db";
import { getSession } from "@/lib/auth/session";
import { verifyShiftQrToken } from "@/lib/qr-token";
import type { ShiftLog } from "@/lib/types/student";

export async function scanShiftQr(token: string): Promise<{
  shiftLog: ShiftLog;
  shiftTitle: string;
  org: string;
  hours: number;
}> {
  const session = await getSession();
  if (!session || session.role !== "STUDENT") {
    throw new Error("Sign in as a student to check in.");
  }

  const trimmed = token.trim();
  if (!trimmed) {
    throw new Error("Enter the QR code from your moderator.");
  }

  const qrSession = await findQrSession(trimmed);
  if (!qrSession || !qrSession.active) {
    throw new Error(
      "Invalid QR code. Ask your moderator to display a fresh code.",
    );
  }

  if (!verifyShiftQrToken(trimmed, qrSession.shiftId, qrSession.issuedAt)) {
    throw new Error(
      "QR code could not be verified. It may have been tampered with.",
    );
  }

  const result = await redeemQrSession(session.userId, trimmed);
  revalidatePath("/", "layout");

  return {
    shiftLog: result.log,
    shiftTitle: result.shiftTitle,
    org: result.org,
    hours: result.hours,
  };
}
