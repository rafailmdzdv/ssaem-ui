"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { addGrammar } from "@/app/[lang]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
  type AddGrammarFields,
  type Grammar,
  addGrammarSourceSchema,
} from "@/lib/types";
import { Routes } from "@/routes";

export default function AddGrammarDialog({
  isDialogOpen,
  dialogOpenFn,
}: Readonly<{
  isDialogOpen: boolean;
  dialogOpenFn: Dispatch<SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const { t } = useLingui();
  const form = useForm<AddGrammarFields>({
    resolver: zodResolver(addGrammarSourceSchema),
  });
  const grammars = [{ name: "faddfadd", explanation: "안녕" }]; // The mock data
  const [selectedGrammar, setSelectedGrammar] = useState<string | null>(null);
  const selectedExplanation = grammars.find(
    (grammar) => grammar.name === selectedGrammar,
  )?.explanation;

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialogOpenFn}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>Add grammar</Trans>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            toast.promise(
              (async () => {
                const grammar = await addGrammar(data);
                if (!grammar) {
                  throw new Error("Failed to add the grammar.");
                }
                router.push(Routes.GRAMMARS);
              })(),
              {
                loading: t`Adding the grammar...`,
                success: t`The grammar was added successfully!`,
                error: t`Something went wrong.`,
              },
            );
          })}
        >
          <FieldGroup>
            <Controller
              name="grammar"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="grammar">
                    <Trans>Grammar</Trans>
                  </FieldLabel>
                  <Select
                    id="grammar"
                    items={grammars.map((grammar) => ({
                      value: grammar.name,
                      label: grammar.name,
                    }))}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedGrammar(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={<Trans>Select a grammar</Trans>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {grammars.map((grammar) => (
                          <SelectItem key={grammar.name} value={grammar.name}>
                            {grammar.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            {selectedExplanation && (
              <div className="rounded-2xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
                {selectedExplanation}
              </div>
            )}
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
