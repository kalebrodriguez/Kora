"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createOrganizationWithModerator,
  type CategoryKey,
} from "@kora/db";
import { getSession } from "@/lib/auth/session";

export interface CreateOrgState {
  error: string | null;
}

const CATEGORY_KEYS: CategoryKey[] = ["community", "environment", "education"];

export async function createOrganizationAction(
  _prev: CreateOrgState,
  formData: FormData,
): Promise<CreateOrgState> {
  const session = await getSession();
  if (!session || session.role !== "SCHOOL_ADMIN") {
    throw new Error("Sign in as a school admin to do that.");
  }

  const categories = formData
    .getAll("categories")
    .map(String)
    .filter((c): c is CategoryKey => CATEGORY_KEYS.includes(c as CategoryKey));

  try {
    await createOrganizationWithModerator(session.userId, {
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      categories,
      distance: String(formData.get("distance") ?? "") || undefined,
      moderatorFirstName: String(formData.get("moderatorFirstName") ?? ""),
      moderatorLastName: String(formData.get("moderatorLastName") ?? ""),
      moderatorEmail: String(formData.get("moderatorEmail") ?? ""),
      moderatorPassword: String(formData.get("moderatorPassword") ?? ""),
      moderatorRoleTitle:
        String(formData.get("moderatorRoleTitle") ?? "") || undefined,
    });
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Could not create organization.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
