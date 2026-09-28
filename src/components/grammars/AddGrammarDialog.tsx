"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { addGrammar } from "@/app/[lang]/actions";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Toaster, toast } from "@/components/ui/toast";
import { krGrammars } from "@/lib/data/krGrammars";
import {
  type AddGrammarFields,
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
  const [grammars, setGrammars] = useState([]);
  const router = useRouter();
  const { t } = useLingui();
  const form = useForm<AddGrammarFields>({
    resolver: zodResolver(addGrammarSourceSchema),
  });

  useEffect(() => {
    krGrammars().then((grammars) => setGrammars(grammars));
  }, []);

  const [selectedGrammar, setSelectedGrammar] = useState<string | null>(null);
  const selectedExplanation = grammars.find(
    (grammar) => grammar.title === selectedGrammar,
  )?.description;

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
                  <Combobox
                    id="grammar"
                    items={grammars.map((grammar) => grammar.title)}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedGrammar(value);
                    }}
                  >
                    <ComboboxInput placeholder={t`Select a grammar`} />
                    <ComboboxContent>
                      <ComboboxEmpty>
                        <Trans>There is no any grammar</Trans>
                      </ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
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
