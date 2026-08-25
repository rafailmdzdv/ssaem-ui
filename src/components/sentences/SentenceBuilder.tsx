"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { type FormEvent, useState } from "react";

import { checkTranslation, generateSentence } from "@/app/[lang]/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "@/components/ui/toast";

export default function SentenceBuilder() {
  const [sentence, setSentence] = useState<string | null>(null);
  const [translation, setTranslation] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { t } = useLingui();

  const handleBuild = () => {
    setIsBuilding(true);
    toast.promise(
      (async () => {
        try {
          const generated = await generateSentence();
          if (!generated) {
            throw new Error("Failed to build a sentence.");
          }
          setSentence(generated.sentence);
          setTranslation("");
        } finally {
          setIsBuilding(false);
        }
      })(),
      {
        loading: t`Building a sentence...`,
        success: t`The sentence is ready!`,
        error: t`Something went wrong.`,
      },
    );
  };

  const handleCheckSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sentence || !translation.trim() || isChecking) {
      return;
    }
    setIsChecking(true);
    try {
      await checkTranslation({ sentence, translation });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          <Trans>Sentence practice</Trans>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex min-h-24 items-center justify-center rounded-2xl border-2 p-6 text-center text-lg leading-relaxed font-medium">
          {sentence ?? (
            <span className="text-muted-foreground select-none">
              <Trans>Your sentence will appear here.</Trans>
            </span>
          )}
        </div>
        <Button
          className="self-center"
          onClick={handleBuild}
          disabled={isBuilding}
        >
          {isBuilding ? (
            <Loader2Icon data-icon="inline-start" className="animate-spin" />
          ) : (
            <SparklesIcon data-icon="inline-start" />
          )}
          <Trans>Build a sentence</Trans>
        </Button>
        {sentence && (
          <form
            className="flex flex-col gap-4 border-t pt-6"
            onSubmit={handleCheckSubmit}
          >
            <Field>
              <FieldLabel htmlFor="translation">
                <Trans>Your translation</Trans>
              </FieldLabel>
              <Input
                id="translation"
                required
                value={translation}
                onChange={(event) => setTranslation(event.target.value)}
              />
            </Field>
            <Button className="self-start" type="submit" disabled={isChecking}>
              {isChecking && (
                <Loader2Icon
                  data-icon="inline-start"
                  className="animate-spin"
                />
              )}
              <Trans>Check</Trans>
            </Button>
          </form>
        )}
      </CardContent>
      <Toaster />
    </Card>
  );
}
