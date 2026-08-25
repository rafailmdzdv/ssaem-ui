import { z } from "zod";

const sourceLanguageEnum = z.enum(["ru", "en"]);

const userResponseSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  source_language: sourceLanguageEnum,
  avatar_url: z.url().or(z.string()),
});

export const userSchema = userResponseSchema.transform((user) => ({
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  sourceLanguage: user.source_language,
  avatarUrl: user.avatar_url,
}));

export type User = z.infer<typeof userSchema>;

export const EmptyUser = userSchema.parse({
  email: "",
  first_name: "",
  last_name: "",
  source_language: "ru",
  avatar_url: "",
});

export const updateUserSourceSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
  sourceLanguage: z.optional(sourceLanguageEnum),
});

export const updateUserTargetSchema = updateUserSourceSchema.transform(
  (user) => ({
    first_name: user.firstName,
    last_name: user.lastName,
    source_language: user.sourceLanguage,
  }),
);

export type UpdateUserFields = z.infer<typeof updateUserSourceSchema>;

export const generatedSentenceSchema = z.object({
  sentence: z.string(),
});

export type GeneratedSentence = z.infer<typeof generatedSentenceSchema>;

export const checkTranslationSchema = z.object({
  sentence: z.string().min(1),
  translation: z.string().min(1),
});

export type CheckTranslationFields = z.infer<typeof checkTranslationSchema>;

export const checkResultSchema = z.object({
  correct: z.boolean(),
});

export type CheckResult = z.infer<typeof checkResultSchema>;

export const topikLevelEnum = z.enum(["topik1", "topik2", "none"]);

export type TopikLevel = z.infer<typeof topikLevelEnum>;

export const wordSchema = z.object({
  id: z.number(),
  word: z.string(),
  translation: z.string(),
  level: topikLevelEnum,
});

export const wordsSchema = z.array(wordSchema);

export type Word = z.infer<typeof wordSchema>;

export const addWordSourceSchema = z.object({
  word: z.string().min(1),
  translation: z.string().min(1),
  level: topikLevelEnum,
});

export type AddWordFields = z.infer<typeof addWordSourceSchema>;

export const grammarSchema = z.object({
  name: z.string(),
  explanation: z.string(),
});

export const grammarsSchema = z.array(grammarSchema);

export type Grammar = z.infer<typeof grammarSchema>;

export const addGrammarSourceSchema = z.object({
  grammar: z.string().min(1),
});

export type AddGrammarFields = z.infer<typeof addGrammarSourceSchema>;
