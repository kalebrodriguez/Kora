import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionUserById, type RoleName, type SessionUser } from "@kora/db";

const COOKIE_NAME = "kora_session";

const ROLE_HOME: Record<RoleName, string> = {
  STUDENT: "/",
  ORG_MODERATOR: "/org",
  SCHOOL_ADMIN: "/admin",
};

export function roleHome(role: RoleName): string {
  return ROLE_HOME[role];
}
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? process.env.QR_HMAC_SECRET ?? "dev-secret";
}

interface SessionPayload {
  userId: string;
  role: RoleName;
  exp: number;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(value: string): SessionPayload | null {
  const [body, sig] = value.split(".");
  if (!body || !sig) {
    return null;
  }

  const expected = Buffer.from(sign(body));
  const actual = Buffer.from(sig);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as SessionPayload;
    if (typeof payload.userId !== "string" || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string, role: RoleName): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession({ userId, role, exp: Date.now() + SESSION_TTL_MS }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return value ? decodeSession(value) : null;
}

/** Full user record for the current session, or null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return getSessionUserById(session.userId);
}

/** Redirects to /login unless signed in with the required role. */
export async function requireRole(role: RoleName): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== role) {
    redirect(roleHome(user.role));
  }
  return user;
}
