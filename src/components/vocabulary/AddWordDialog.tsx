"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

import { addWord } from "@/app/[lang]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "@/components/ui/toast";
import {
  type AddWordFields,
  type TopikLevel,
  addWordSourceSchema,
} from "@/lib/types";
import { Routes } from "@/routes";

import { TOPIK_LEVEL_ITEMS } from "./topik";

export default function AddWordDialog({
  isDialogOpen,
  dialogOpenFn,
}: Readonly<{
  isDialogOpen: boolean;
  dialogOpenFn: Dispatch<SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const { t } = useLingui();
  const form = useForm<AddWordFields>({
    resolver: zodResolver(addWordSourceSchema),
    defaultValues: {
      level: "none" satisfies TopikLevel,
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialogOpenFn}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>Add word</Trans>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            toast.promise(
              (async () => {
                const word = await addWord(data);
                if (!word) {
                  throw new Error("Failed to add the word.");
                }
                router.push(Routes.VOCABULARY);
              })(),
              {
                loading: t`Adding the word...`,
                success: t`The word was added successfully!`,
                error: t`Something went wrong.`,
              },
            );
          })}
        >
          <FieldGroup>
            <Controller
              name="word"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="word">
                    <Trans>Word</Trans>
                  </FieldLabel>
                  <Input
                    id="word"
                    required
                    placeholder="안녕하세요"
                    {...field}
                  />
                </Field>
              )}
            />
            <Controller
              name="translation"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="translation">
                    <Trans>Translation</Trans>
                  </FieldLabel>
                  <Input id="translation" required {...field} />
                </Field>
              )}
            />
            <Controller
              name="level"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="level">
                    <Trans>TOPIK level</Trans>
                  </FieldLabel>
                  <Select
                    id="level"
                    items={TOPIK_LEVEL_ITEMS}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {TOPIK_LEVEL_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Field className="max-w-24">
              <Button type="submit">
                <Trans>Save</Trans>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
