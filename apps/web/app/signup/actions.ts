"use server";

import { redirect } from "next/navigation";
import { registerStudent } from "@kora/db";
import { createSession, roleHome } from "@/lib/auth/session";

export interface SignupState {
  error: string | null;
}

export async function signup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const firstName = String(formData.get("firstName") ?? "");
  const lastName = String(formData.get("lastName") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const schoolId = String(formData.get("schoolId") ?? "");
  const gradeLevel = Number(formData.get("gradeLevel") ?? 0);

  const result = await registerStudent({
    firstName,
    lastName,
    email,
    password,
    schoolId,
    gradeLevel,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  await createSession(result.user.id, result.user.role);
  redirect(roleHome(result.user.role));
}
