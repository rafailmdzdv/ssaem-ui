import { cache } from "react";

import { grammarRoutes } from "@/lib/api/grammars";
import { vocabularyRoutes } from "@/lib/api/vocabulary";
import { authorizationHeader } from "@/lib/auth";
import {
  type Grammar,
  type User,
  type Word,
  grammarsSchema,
  userSchema,
  wordsSchema,
} from "@/lib/types";

export const getUser: () => Promise<User | null> = cache(async function () {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(`${process.env.BACKEND_API_URL}/user/`, {
    headers: { Authorization: authHeader },
  });
  return await userSchema.parseAsync(await response.json());
});

export const getWords: () => Promise<Word[]> = cache(async function () {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return [];
  }
  const response = await fetch(vocabularyRoutes.list(), {
    headers: { Authorization: authHeader },
  });
  return await wordsSchema.parseAsync(await response.json());
});

const fetchGrammars = async (url: string): Promise<Grammar[]> => {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return [];
  }
  const response = await fetch(url, {
    headers: { Authorization: authHeader },
  });
  return await grammarsSchema.parseAsync(await response.json());
};

export const getGrammars: () => Promise<Grammar[]> = cache(async function () {
  return await fetchGrammars(grammarRoutes.list());
});

export const getAllGrammars: () => Promise<Grammar[]> = cache(
  async function () {
    return await fetchGrammars(grammarRoutes.all());
  },
);
