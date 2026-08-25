"use server";
import { grammarRoutes } from "@/lib/api/grammars";
import { practiceRoutes } from "@/lib/api/practice";
import { userRoutes } from "@/lib/api/user";
import { vocabularyRoutes } from "@/lib/api/vocabulary";
import { authorizationHeader } from "@/lib/auth";
import {
  type AddGrammarFields,
  type AddWordFields,
  type CheckResult,
  type CheckTranslationFields,
  type GeneratedSentence,
  type Grammar,
  type UpdateUserFields,
  type Word,
  addGrammarSourceSchema,
  addWordSourceSchema,
  checkResultSchema,
  checkTranslationSchema,
  generatedSentenceSchema,
  grammarSchema,
  updateUserTargetSchema,
  wordSchema,
} from "@/lib/types";

export async function updateUser(formData: UpdateUserFields) {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  await fetch(userRoutes.update(), {
    method: "PATCH",
    body: JSON.stringify(await updateUserTargetSchema.parseAsync(formData)),
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
  });
}

export async function uploadAvatar(
  htmlFiles: FileList,
): Promise<{ avatar_url: string } | null> {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const formData = new FormData();
  formData.append("avatar", htmlFiles[0]);
  const response = await fetch(userRoutes.uploadAvatar(), {
    method: "POST",
    body: formData,
    headers: { Authorization: authHeader },
  });
  return await response.json();
}

export async function generateSentence(): Promise<GeneratedSentence | null> {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(practiceRoutes.generate(), {
    method: "POST",
    headers: { Authorization: authHeader },
  });
  return await generatedSentenceSchema.parseAsync(await response.json());
}

export async function checkTranslation(
  fields: CheckTranslationFields,
): Promise<CheckResult | null> {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(practiceRoutes.check(), {
    method: "POST",
    body: JSON.stringify(await checkTranslationSchema.parseAsync(fields)),
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
  });
  return await checkResultSchema.parseAsync(await response.json());
}

export async function addWord(fields: AddWordFields): Promise<Word | null> {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(vocabularyRoutes.add(), {
    method: "POST",
    body: JSON.stringify(await addWordSourceSchema.parseAsync(fields)),
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
  });
  return await wordSchema.parseAsync(await response.json());
}

export async function addGrammar(
  fields: AddGrammarFields,
): Promise<Grammar | null> {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(grammarRoutes.list(), {
    method: "POST",
    body: JSON.stringify(await addGrammarSourceSchema.parseAsync(fields)),
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
  });
  return await grammarSchema.parseAsync(await response.json());
}
