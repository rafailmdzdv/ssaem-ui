"use client";

import { Trans } from "@lingui/react/macro";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Word } from "@/lib/types";

import AddWordDialog from "./AddWordDialog";
import { topikLevelLabel } from "./topik";

function WordRow({ word }: { word: Word }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="font-medium">{word.word}</span>
      <span className="min-w-0 flex-1 truncate text-muted-foreground">
        {word.translation}
      </span>
      <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
        {topikLevelLabel(word.level)}
      </span>
    </div>
  );
}

export default function WordList({ words }: Readonly<{ words: Word[] }>) {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Card className="w-full h-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          <Trans>Vocabulary</Trans>
        </CardTitle>
        <CardAction>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <PlusIcon data-icon="inline-start" />
            <Trans>Add word</Trans>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {words.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            <Trans>No words yet.</Trans>
          </p>
        ) : (
          <div className="divide-y">
            {words.map((word) => (
              <WordRow key={word.id} word={word} />
            ))}
          </div>
        )}
      </CardContent>
      <AddWordDialog isDialogOpen={isDialogOpen} dialogOpenFn={setDialogOpen} />
    </Card>
  );
}
