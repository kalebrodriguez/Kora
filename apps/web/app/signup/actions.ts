"use server";

import { redirect } from "next/navigation";
import {
  registerAdmin,
  registerOrganization,
  registerStudent,
  type AuthResult,
  type CategoryKey,
} from "@kora/db";
import { createSession, roleHome } from "@/lib/auth/session";
import { isSupportedState } from "@/lib/compliance";

export type SignupRole = "student" | "admin" | "organization";

export interface SignupState {
  error: string | null;
}

const VALID_CATEGORIES: CategoryKey[] = ["community", "environment", "education"];

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "");
}

async function runSignup(role: SignupRole, formData: FormData): Promise<AuthResult> {
  const firstName = str(formData, "firstName");
  const lastName = str(formData, "lastName");
  const email = str(formData, "email");
  const password = str(formData, "password");

  if (role === "student") {
    return registerStudent({
      firstName,
      lastName,
      email,
      password,
      schoolId: str(formData, "schoolId"),
      gradeLevel: Number(formData.get("gradeLevel") ?? 0),
    });
  }

  if (role === "admin") {
    const state = str(formData, "state");
    if (!isSupportedState(state)) {
      return { ok: false, error: "Select a supported state." };
    }
    return registerAdmin({
      firstName,
      lastName,
      email,
      password,
      schoolName: str(formData, "schoolName"),
      state,
      district: str(formData, "district"),
    });
  }

  const categories = formData
    .getAll("categories")
    .map(String)
    .filter((c): c is CategoryKey => VALID_CATEGORIES.includes(c as CategoryKey));

  return registerOrganization({
    orgName: str(formData, "orgName"),
    description: str(formData, "description"),
    categories,
    firstName,
    lastName,
    email,
    password,
    roleTitle: str(formData, "roleTitle"),
  });
}

export async function signup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const role = str(formData, "role") as SignupRole;
  if (!["student", "admin", "organization"].includes(role)) {
    return { error: "Pick an account type." };
  }

  const result = await runSignup(role, formData);
  if (!result.ok) {
    return { error: result.error };
  }

  await createSession(result.user.id, result.user.role);
  redirect(roleHome(result.user.role));
}
