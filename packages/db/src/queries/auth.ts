import { prisma } from "../client";
import { verifyPassword } from "../password";
import type { RoleName, SessionUser } from "../types";

function toSessionUser(user: {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}): SessionUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role as RoleName,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return toSessionUser(user);
}

export async function getSessionUserById(
  userId: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? toSessionUser(user) : null;
}
