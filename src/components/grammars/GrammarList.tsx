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
import { type Grammar } from "@/lib/types";

import AddGrammarDialog from "./AddGrammarDialog";

function GrammarRow({ grammar }: { grammar: Grammar }) {
  return (
    <div className="flex flex-col gap-1 py-3">
      <span className="font-medium">{grammar.name}</span>
      <span className="text-sm text-muted-foreground">
        {grammar.explanation}
      </span>
    </div>
  );
}

export default function GrammarList({
  grammars,
}: Readonly<{ grammars: Grammar[] }>) {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Card className="w-full h-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          <Trans>Grammars</Trans>
        </CardTitle>
        <CardAction>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <PlusIcon data-icon="inline-start" />
            <Trans>Add grammar</Trans>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {grammars.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            <Trans>No grammars yet.</Trans>
          </p>
        ) : (
          <div className="divide-y">
            {grammars.map((grammar) => (
              <GrammarRow key={grammar.name} grammar={grammar} />
            ))}
          </div>
        )}
      </CardContent>
      <AddGrammarDialog
        isDialogOpen={isDialogOpen}
        dialogOpenFn={setDialogOpen}
      />
    </Card>
  );
}
