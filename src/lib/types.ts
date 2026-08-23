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
