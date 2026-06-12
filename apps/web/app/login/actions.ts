"use server";

import { redirect } from "next/navigation";
import { authenticateUser } from "@kora/db";
import { createSession, destroySession, roleHome } from "@/lib/auth/session";

export interface LoginState {
  error: string | null;
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id, user.role);
  redirect(roleHome(user.role));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
